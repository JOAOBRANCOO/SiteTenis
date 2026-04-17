import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './store/CartContext';
import { AuthProvider } from './store/AuthContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
