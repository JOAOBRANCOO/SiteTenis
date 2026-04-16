require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET precisa ser definido em produção. Encerrando.');
  process.exit(1);
}
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// ── Middlewares ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(',')
      : ['http://localhost:5500', 'http://127.0.0.1:5500'],
  })
);

// Limite de requisições para rotas de autenticação (proteção contra força bruta)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20,
  message: { error: 'Muitas tentativas. Tente novamente em 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limite de requisições para rotas autenticadas da API
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 60,
  message: { error: 'Limite de requisições atingido. Tente novamente em 1 minuto.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Classe de erro de domínio ─────────────────────────────────────────────────
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Token não fornecido' });
  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

// ── Rotas: Saúde ──────────────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// ── Rotas: Marcas ─────────────────────────────────────────────────────────────
app.get('/api/brands', async (req, res) => {
  try {
    const brands = await prisma.brand.findMany({ orderBy: { name: 'asc' } });
    res.json(brands);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/brands/:slug', async (req, res) => {
  try {
    const brand = await prisma.brand.findUnique({
      where: { slug: req.params.slug },
      include: { products: { where: { isActive: true }, include: { images: true } } },
    });
    if (!brand) return res.status(404).json({ error: 'Marca não encontrada' });
    res.json(brand);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Rotas: Categorias ─────────────────────────────────────────────────────────
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    res.json(categories);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Rotas: Produtos ───────────────────────────────────────────────────────────
app.get('/api/products', async (req, res) => {
  try {
    const { brand, category, search, page = 1, limit = 12 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where = {
      isActive: true,
      ...(brand && { brand: { slug: brand } }),
      ...(category && { category: { slug: category } }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          brand: true,
          category: true,
          images: { where: { isPrimary: true }, take: 1 },
          sizes: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({ data: products, total, page: Number(page), limit: Number(limit) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/products/:slug', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
      include: { brand: true, category: true, images: true, sizes: true },
    });
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Rotas: Autenticação ───────────────────────────────────────────────────────
app.post('/api/auth/register', authLimiter, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios' });

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ error: 'E-mail já cadastrado' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    res.status(201).json({ user, token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/auth/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Rotas: Usuário (autenticado) ──────────────────────────────────────────────
app.get('/api/users/me', apiLimiter, auth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true, createdAt: true, addresses: true },
    });
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Rotas: Pedidos ────────────────────────────────────────────────────────────
app.post('/api/orders', authLimiter, auth, async (req, res) => {
  try {
    const { addressId, items } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ error: 'Itens do pedido são obrigatórios' });

    // Busca em lote todos os produtos e tamanhos em duas queries (evita N+1)
    const productIds = items.map((i) => i.productId);
    const sizeIds = items.map((i) => i.sizeId);

    const [products, sizes] = await Promise.all([
      prisma.product.findMany({ where: { id: { in: productIds } } }),
      prisma.productSize.findMany({ where: { id: { in: sizeIds } } }),
    ]);

    const productMap = Object.fromEntries(products.map((p) => [p.id, p]));
    const sizeMap = Object.fromEntries(sizes.map((s) => [s.id, s]));

    let total = 0;
    const itemsData = [];

    for (const item of items) {
      const product = productMap[item.productId];
      if (!product) return res.status(404).json({ error: `Produto ${item.productId} não encontrado` });

      const size = sizeMap[item.sizeId];
      if (!size || size.stockQuantity < item.quantity)
        return res.status(400).json({ error: 'Estoque insuficiente para o tamanho solicitado' });

      total += product.price * item.quantity;
      itemsData.push({ productId: product.id, sizeId: size.id, quantity: item.quantity, unitPrice: product.price });
    }

    // Envolve a criação do pedido e o decremento de estoque em uma transação (evita condições de corrida)
    const order = await prisma.$transaction(async (tx) => {
      // Reverifica o estoque dentro da transação para evitar condições de corrida
      for (const item of itemsData) {
        const size = await tx.productSize.findUnique({ where: { id: item.sizeId } });
        if (!size || size.stockQuantity < item.quantity)
          throw new AppError('Estoque insuficiente para o tamanho solicitado', 400);
      }

      const createdOrder = await tx.order.create({
        data: {
          userId: req.user.id,
          addressId: addressId || null,
          total,
          items: { create: itemsData },
        },
        include: { items: { include: { product: true, size: true } } },
      });

      for (const item of itemsData) {
        await tx.productSize.update({
          where: { id: item.sizeId },
          data: { stockQuantity: { decrement: item.quantity } },
        });
      }

      return createdOrder;
    });

    res.status(201).json(order);
  } catch (e) {
    const status = e instanceof AppError ? e.statusCode : 500;
    res.status(status).json({ error: e.message });
  }
});

app.get('/api/orders', apiLimiter, auth, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: { items: { include: { product: true } }, payment: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Iniciar servidor ──────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 SiteTenis API rodando em http://localhost:${PORT}`);
});

module.exports = app;
