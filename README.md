# 👟 SiteTenis

> Catálogo e e-commerce de tênis das maiores marcas esportivas do mundo.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

---

## 📖 Sobre o projeto

O **SiteTenis** é um site de catálogo e e-commerce de tênis voltado para amantes de calçados esportivos e casuais. O projeto exibe produtos das principais marcas do mercado — **Adidas**, **Nike**, **New Balance** e **Mizuno** — com informações sobre cada marca, galeria de produtos, sistema de registro de usuários e uma API REST para gerenciamento do catálogo, pedidos e pagamentos.

### Público-alvo
- Consumidores interessados em comprar tênis online.
- Entusiastas de sneakers que querem conhecer os lançamentos históricos.

### Principais funcionalidades
| Área | Funcionalidade |
|---|---|
| Frontend | Catálogo visual de tênis por marca |
| Frontend | Página "Saiba mais" detalhada para cada marca |
| Frontend | Formulário de registro de usuários com validação |
| API | Listagem e busca de produtos, marcas e categorias |
| API | Autenticação de usuários (JWT) |
| API | Criação e consulta de pedidos |
| Banco | Schema relacional completo com migrations e seeds |

---

## 🛠 Stack / Tecnologias

### Frontend (estático)
| Tecnologia | Versão | Função |
|---|---|---|
| HTML5 | — | Estrutura das páginas |
| CSS3 | — | Estilização e layout responsivo |
| JavaScript (ES6+) | — | Validação de formulários e interatividade |
| Google Fonts | — | Tipografia (Raleway, Roboto) |

### Backend (API)
| Tecnologia | Versão | Função |
|---|---|---|
| Node.js | ≥ 18.x | Runtime do servidor |
| Express | ^4.19 | Framework HTTP |
| Prisma ORM | ^5.22 | ORM e migrations |
| SQLite | — | Banco de dados para desenvolvimento |
| PostgreSQL | — | Banco de dados para produção |
| bcryptjs | ^2.4 | Hash de senhas |
| jsonwebtoken | ^9.0 | Autenticação JWT |
| dotenv | ^16.4 | Variáveis de ambiente |

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) **≥ 18.0.0** — `node --version`
- [npm](https://www.npmjs.com/) **≥ 9.x** — `npm --version`
- (Opcional) [VS Code Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) para servir o frontend sem build

Para produção com PostgreSQL:
- [PostgreSQL](https://www.postgresql.org/) **≥ 14**

---

## 🚀 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/JOAOBRANCOO/SiteTenis.git
cd SiteTenis
```

### 2. Configure o backend

```bash
cd backend
cp ../.env.example .env   # copie o arquivo de exemplo e edite conforme necessário
```

Edite o `.env` criado em `backend/.env` — para desenvolvimento, os valores padrão já funcionam com SQLite.

### 3. Instale as dependências

```bash
# dentro de /backend
npm install
```

### 4. Execute as migrations e o seed

```bash
# Cria o banco e aplica todas as migrations
npm run db:migrate:dev

# Popula o banco com dados iniciais
npm run db:seed
```

### 5. Inicie o servidor da API

```bash
# Modo desenvolvimento (com hot-reload via nodemon)
npm run dev

# Modo produção
npm start
```

A API ficará disponível em `http://localhost:3000`.

### 6. Abra o frontend

Abra o arquivo `index.html` diretamente no navegador, **ou** use o Live Server do VS Code:

1. Clique com botão direito em `index.html` → *Open with Live Server*
2. Acesse `http://127.0.0.1:5500`

> **Dica:** O backend e o frontend são independentes. Você pode usar o frontend estático sem rodar a API.

---

## ⚙️ Variáveis de ambiente

Copie `.env.example` para `backend/.env` e ajuste os valores:

| Variável | Padrão | Descrição |
|---|---|---|
| `PORT` | `3000` | Porta em que o servidor Express escuta |
| `NODE_ENV` | `development` | Ambiente: `development`, `production` ou `test` |
| `DATABASE_URL` | `file:./dev.db` | URL de conexão do banco (SQLite para dev, Postgres para prod) |
| `JWT_SECRET` | — | Segredo para assinar tokens JWT (use um valor longo e aleatório em produção) |
| `JWT_EXPIRES_IN` | `7d` | Tempo de expiração do token JWT |
| `CORS_ORIGINS` | `http://localhost:5500,...` | Origens permitidas para CORS (separadas por vírgula) |

### Exemplo para PostgreSQL em produção

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/sitetenis?schema=public"
NODE_ENV=production
JWT_SECRET="um-segredo-muito-longo-e-aleatorio"
```

---

## 📁 Estrutura de pastas

```
SiteTenis/
├── index.html              # Página principal (catálogo + hero)
├── registro.html           # Formulário de registro de usuário
├── saiba+adidas.html       # Detalhes da marca Adidas
├── saiba+nike.html         # Detalhes da marca Nike
├── saiba+newbalance.html   # Detalhes da marca New Balance
├── saiba+mizuno.html       # Detalhes da marca Mizuno
├── script.js               # Lógica JS do formulário de registro
│
├── src/
│   ├── css/
│   │   ├── global.css      # Estilos globais (header, hero, produtos, serviços)
│   │   ├── variables.css   # Variáveis CSS (cores, fontes)
│   │   ├── reset.css       # Reset de estilos
│   │   ├── registro.css    # Estilos da página de registro
│   │   └── sections/       # Estilos por seção (header, footer, saiba+, etc.)
│   └── images/
│       ├── img-tenis/      # Fotos dos produtos
│       └── img-logos/      # Logos das redes sociais
│
├── backend/                # API REST Node.js
│   ├── server.js           # Servidor Express + rotas da API
│   ├── package.json        # Dependências e scripts npm
│   └── prisma/
│       ├── schema.prisma   # Modelo de dados (Prisma ORM)
│       └── seed.js         # Dados iniciais para desenvolvimento
│
├── .env.example            # Exemplo de variáveis de ambiente
├── .gitignore
└── README.md
```

---

## 🗄 Banco de dados

O banco é gerenciado pelo **Prisma ORM**. Em desenvolvimento usa **SQLite** (sem configuração extra); em produção use **PostgreSQL**.

### Diagrama do modelo de dados

```
brands          categories
  │                │
  └──── products ──┘
           │
    ┌──────┴──────┐
    │             │
product_images  product_sizes ◄──── order_items
                                        │
users ──── addresses ──── orders ───────┘
                            │
                          payments
```

### Tabelas principais

| Tabela | Descrição |
|---|---|
| `brands` | Marcas de tênis (Adidas, Nike, etc.) |
| `categories` | Categorias de produto (Corrida, Casual, Basquete, etc.) |
| `products` | Catálogo de tênis com preço e descrição |
| `product_images` | Imagens de cada produto (suporte a múltiplas fotos) |
| `product_sizes` | Tamanhos disponíveis e estoque por tamanho |
| `users` | Usuários cadastrados (clientes e admins) |
| `addresses` | Endereços de entrega dos usuários |
| `orders` | Pedidos realizados pelos clientes |
| `order_items` | Itens de cada pedido (produto + tamanho + quantidade) |
| `payments` | Registro simplificado de pagamentos |

### Scripts do banco de dados

Execute os comandos dentro da pasta `/backend`:

```bash
# Cria/atualiza o banco aplicando migrations pendentes (dev)
npm run db:migrate:dev

# Aplica migrations em produção (sem interatividade)
npm run db:migrate

# Popula o banco com dados de exemplo
npm run db:seed

# Reseta o banco (apaga tudo) e executa o seed novamente
npm run db:reset

# Abre o Prisma Studio (interface visual do banco)
npm run db:studio
```

---

## 🔌 API – Endpoints principais

Base URL: `http://localhost:3000`

### Saúde
| Método | Rota | Descrição |
|---|---|---|
| GET | `/health` | Verifica se a API está no ar |

### Marcas
| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/brands` | Lista todas as marcas |
| GET | `/api/brands/:slug` | Detalhes de uma marca + seus produtos |

### Categorias
| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/categories` | Lista todas as categorias |

### Produtos
| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/products` | Lista produtos (suporte a filtros e paginação) |
| GET | `/api/products/:slug` | Detalhes de um produto |

**Query params disponíveis para `/api/products`:**
- `brand` — slug da marca (ex.: `adidas`)
- `category` — slug da categoria (ex.: `corrida`)
- `search` — texto de busca por nome/descrição
- `page` — número da página (padrão: `1`)
- `limit` — itens por página (padrão: `12`)

### Autenticação
| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/auth/register` | Registra novo usuário |
| POST | `/api/auth/login` | Autentica e retorna token JWT |

### Usuário (requer JWT)
| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/users/me` | Dados do usuário logado |

### Pedidos (requer JWT)
| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/orders` | Cria novo pedido |
| GET | `/api/orders` | Lista pedidos do usuário logado |

---

## 🤝 Como contribuir

### Fluxo de trabalho

1. Faça um **fork** do repositório.
2. Crie uma branch a partir de `main` seguindo o padrão:
   - `feat/nome-da-feature` — para novas funcionalidades
   - `fix/descricao-do-bug` — para correções de bugs
   - `docs/o-que-foi-documentado` — para melhorias em documentação
   - `chore/o-que-foi-feito` — para tarefas de manutenção (dependências, CI, etc.)

```bash
git checkout -b feat/filtro-por-preco
```

3. Faça commits pequenos e descritivos seguindo o padrão **Conventional Commits**:

```
tipo(escopo): descrição curta em português

# Exemplos:
feat(api): adiciona endpoint de filtro por preço
fix(frontend): corrige alinhamento do card de produto no mobile
docs(readme): adiciona seção de troubleshooting
chore(deps): atualiza prisma para v5.22
```

4. Abra um **Pull Request** descrevendo:
   - O que foi alterado e por quê.
   - Como testar as mudanças.

---

## 🚢 Deploy (opcional)

### Backend — Railway / Render / Fly.io

1. Crie um banco PostgreSQL no provedor escolhido.
2. Configure a variável `DATABASE_URL` com a URL do PostgreSQL.
3. Configure `NODE_ENV=production` e `JWT_SECRET` com um valor seguro.
4. No start command, use: `npm run db:migrate && npm start`

### Frontend — GitHub Pages / Netlify / Vercel

O frontend é 100% estático e pode ser publicado em qualquer CDN:

```bash
# GitHub Pages: basta habilitar nas configurações do repo
# Netlify: arraste a pasta raiz do projeto para netlify.com
```

> Lembre-se de atualizar a URL base da API no `script.js` para apontar para o backend em produção.

---

## 🔧 Troubleshooting

### `Cannot find module '@prisma/client'`
Execute `npm install` e em seguida `npm run db:generate` dentro de `/backend`.

### `Error: P1001: Can't reach database server`
Verifique se o arquivo `DATABASE_URL` no `.env` está correto. Para SQLite, o caminho relativo `file:./dev.db` cria o arquivo automaticamente após a migration.

### Porta 3000 já em uso
Edite o arquivo `.env` e troque o valor de `PORT` para outra porta disponível (ex.: `3001`).

### Imagens não aparecem no frontend
As imagens são referenciadas por caminhos relativos. Abra o `index.html` usando Live Server ou um servidor HTTP local, não clicando diretamente no arquivo.

---

## 📜 Licença

Este projeto está licenciado sob a **MIT License** — veja o arquivo [LICENSE](LICENSE) para detalhes.

---

Desenvolvido com ❤️ por [João Branco](https://github.com/JOAOBRANCOO)
