import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../store/CartContext';
import './Cart.css';

export default function Cart() {
  const { state, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  if (state.items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Seu carrinho está vazio</h2>
        <p>Adicione produtos para continuar</p>
        <Link to="/produtos" className="cart-empty-btn">Ver Produtos</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Meu Carrinho ({totalItems} item{totalItems !== 1 ? 's' : ''})</h1>
        <div className="cart-content">
          <div className="cart-items">
            {state.items.map(item => (
              <div key={`${item.product.id}-${item.selectedSize}`} className="cart-item">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="cart-item-image"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=T'; }}
                />
                <div className="cart-item-info">
                  <p className="cart-item-brand">{item.product.brand}</p>
                  <p className="cart-item-name">{item.product.name}</p>
                  <p className="cart-item-size">Tamanho: {item.selectedSize}</p>
                  <p className="cart-item-price">
                    {item.product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>
                <div className="cart-item-controls">
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}>+</button>
                  </div>
                  <p className="cart-item-subtotal">
                    {(item.product.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                  <button className="cart-item-remove" onClick={() => removeItem(item.product.id, item.selectedSize)}>
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Resumo do Pedido</h3>
            <div className="summary-row">
              <span>Subtotal ({totalItems} itens)</span>
              <span>{totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <div className="summary-row">
              <span>Frete</span>
              <span className="free-shipping">Grátis</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>{totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <button className="checkout-btn" onClick={() => navigate('/checkout')}>
              Finalizar Compra
            </button>
            <Link to="/produtos" className="continue-shopping">Continuar comprando</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
