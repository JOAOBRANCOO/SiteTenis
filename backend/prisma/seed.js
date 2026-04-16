/**
 * Seed – dados iniciais para desenvolvimento
 *
 * Execute com:  npm run db:seed  (dentro de /backend)
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // ── Marcas ──────────────────────────────────────────────────────────────────
  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { slug: 'adidas' },
      update: {},
      create: {
        name: 'Adidas',
        slug: 'adidas',
        description:
          'Fundada em 1949 por Adolf Dassler, a Adidas é uma das marcas mais icônicas do mundo dos esportes.',
        website: 'https://www.adidas.com.br',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'nike' },
      update: {},
      create: {
        name: 'Nike',
        slug: 'nike',
        description:
          'Fundada em 1964 por Bill Bowerman e Phil Knight, a Nike é sinônimo de inovação, desempenho e estilo.',
        website: 'https://www.nike.com.br',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'new-balance' },
      update: {},
      create: {
        name: 'New Balance',
        slug: 'new-balance',
        description:
          'Fundada em 1906, a New Balance é referência em tênis de corrida com foco em conforto e estabilidade.',
        website: 'https://www.newbalance.com.br',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'mizuno' },
      update: {},
      create: {
        name: 'Mizuno',
        slug: 'mizuno',
        description:
          'Fundada no Japão em 1906, a Mizuno é reconhecida pela precisão na engenharia de tênis de alta performance.',
        website: 'https://www.mizuno.com.br',
      },
    }),
  ]);

  const [adidas, nike, newBalance, mizuno] = brands;
  console.log(`✅ ${brands.length} marcas criadas/atualizadas`);

  // ── Categorias ──────────────────────────────────────────────────────────────
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'corrida' },
      update: {},
      create: { name: 'Corrida', slug: 'corrida', description: 'Tênis para corrida e trail running' },
    }),
    prisma.category.upsert({
      where: { slug: 'casual' },
      update: {},
      create: { name: 'Casual', slug: 'casual', description: 'Tênis para uso cotidiano e lifestyle' },
    }),
    prisma.category.upsert({
      where: { slug: 'basquete' },
      update: {},
      create: { name: 'Basquete', slug: 'basquete', description: 'Tênis para quadra e basquete' },
    }),
    prisma.category.upsert({
      where: { slug: 'futebol' },
      update: {},
      create: { name: 'Futebol', slug: 'futebol', description: 'Chuteiras e tênis para futebol de campo e society' },
    }),
  ]);

  const [corrida, casual, basquete] = categories;
  console.log(`✅ ${categories.length} categorias criadas/atualizadas`);

  // ── Produtos ────────────────────────────────────────────────────────────────
  const sizesTemplate = ['37', '38', '39', '40', '41', '42', '43', '44'];

  async function createProduct({ slug, ...data }, sizeList = sizesTemplate) {
    const product = await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        ...data,
        sizes: {
          create: sizeList.map((s) => ({ sizeLabel: s, stockQuantity: Math.floor(Math.random() * 20) + 1 })),
        },
      },
    });
    return product;
  }

  const products = await Promise.all([
    // Adidas
    createProduct({
      name: 'Adidas Ultraboost 22',
      slug: 'adidas-ultraboost-22',
      description: 'Amortecimento Boost para máximo retorno de energia em corridas longas.',
      price: 899.99,
      brandId: adidas.id,
      categoryId: corrida.id,
    }),
    createProduct({
      name: 'Adidas Stan Smith',
      slug: 'adidas-stan-smith',
      description: 'Clássico tênis casual de couro, símbolo de estilo atemporal.',
      price: 599.99,
      brandId: adidas.id,
      categoryId: casual.id,
    }),

    // Nike
    createProduct({
      name: 'Nike Air Max 270',
      slug: 'nike-air-max-270',
      description: 'Unidade de ar Max no calcanhar para conforto e estilo no dia a dia.',
      price: 799.99,
      brandId: nike.id,
      categoryId: casual.id,
    }),
    createProduct({
      name: 'Nike React Infinity Run 3',
      slug: 'nike-react-infinity-run-3',
      description: 'Projetado para reduzir lesões de corrida com espuma React ultraresponsiva.',
      price: 949.99,
      brandId: nike.id,
      categoryId: corrida.id,
    }),

    // New Balance
    createProduct({
      name: 'New Balance 574',
      slug: 'new-balance-574',
      description: 'Ícone do estilo street com amortecimento ENCAP para conforto duradouro.',
      price: 649.99,
      brandId: newBalance.id,
      categoryId: casual.id,
    }),
    createProduct({
      name: 'New Balance Fresh Foam 1080v13',
      slug: 'new-balance-fresh-foam-1080v13',
      description: 'O tênis de corrida mais luxuoso da New Balance, com espuma Fresh Foam X.',
      price: 1099.99,
      brandId: newBalance.id,
      categoryId: corrida.id,
    }),

    // Mizuno
    createProduct({
      name: 'Mizuno Wave Rider 27',
      slug: 'mizuno-wave-rider-27',
      description: 'Leveza e amortecimento Wave para corredores de longa distância.',
      price: 849.99,
      brandId: mizuno.id,
      categoryId: corrida.id,
    }),
    createProduct({
      name: 'Mizuno Wave Prophecy 12',
      slug: 'mizuno-wave-prophecy-12',
      description: 'Topo de linha Mizuno com tecnologia Wave máxima para superpronadores.',
      price: 1299.99,
      brandId: mizuno.id,
      categoryId: corrida.id,
    }),
  ]);

  console.log(`✅ ${products.length} produtos criados/atualizados`);

  // ── Usuário admin ───────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@sitetenis.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@sitetenis.com',
      passwordHash,
      role: 'admin',
    },
  });

  console.log('✅ Usuário admin criado (email: admin@sitetenis.com | senha: admin123)');
  console.log('🌱 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
