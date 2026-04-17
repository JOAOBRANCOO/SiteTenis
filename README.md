# Historical Releases | João Branco

Loja online de tênis esportivos das maiores marcas do mundo.

## 🚀 Tech Stack

- **React 18** + **TypeScript**
- **Vite** (bundler)
- **React Router DOM v6** (routing)
- **Context API + useReducer** (state management)
- **CSS Modules** (per-component styles)

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
  components/     # Reusable UI components
  pages/          # Route-level page components
  routes/         # App routing configuration
  services/       # Payment & Auth service layer
  store/          # React Context providers
  types/          # TypeScript interfaces
  data/           # Static product data (JSON)
  lib/            # Third-party integrations (Firebase stub)
```

## 🗺️ Available Routes

| Route | Page | Protected |
|-------|------|-----------|
| `/` | Home | No |
| `/produtos` | Products catalog | No |
| `/produtos/:id` | Product detail | No |
| `/carrinho` | Cart | No |
| `/checkout` | Checkout + payment | ✅ Yes |
| `/login` | Login | No |
| `/reset-senha` | Password reset | No |
| `/conta` | My account | ✅ Yes |
| `/pagamento/confirmacao/:id` | Payment confirmation | No |

## 🔐 Demo Credentials

```
Email: demo@historicalreleases.com
Password: demo123
```

## 🔥 Firebase Auth Integration

1. Install: `npm install firebase`
2. Create project at [console.firebase.google.com](https://console.firebase.google.com)
3. Enable Email/Password auth
4. Copy `.env.example` to `.env` and fill values
5. Implement `src/services/auth/firebaseAuthService.ts`
6. Update `src/services/auth/index.ts` to use `FirebaseAuthService`

## 💳 PagSeguro Integration

1. Create account at [pagseguro.uol.com.br](https://pagseguro.uol.com.br)
2. Add `VITE_PAGSEGURO_TOKEN` to `.env`
3. Create `src/services/payment/pagSeguroPaymentService.ts` implementing `IPaymentService`
4. Update `src/services/payment/index.ts` to use the new service

## ⚙️ Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_PAGSEGURO_TOKEN` | PagSeguro API token |
| `VITE_PAGSEGURO_ENV` | PagSeguro environment (`sandbox` or `production`) |
