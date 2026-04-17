import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Checkout/Checkout';
import Payment from '../pages/Payment/Payment';
import Login from '../pages/Login/Login';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import Account from '../pages/Account/Account';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

export default function AppRoutes() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/produtos/:id" element={<ProductDetail />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/pagamento" element={<Payment />} />
          <Route path="/pagamento/confirmacao/:paymentId" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-senha" element={<ResetPassword />} />
          <Route path="/conta" element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
