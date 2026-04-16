import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../store/CartContext';
import { useAuth } from '../../store/AuthContext';
import { paymentService } from '../../services/payment';
import { CheckoutAddress, PaymentData } from '../../types/payment';
import './Checkout.css';

const initialAddress: CheckoutAddress = {
  street: '', number: '', complement: '', neighborhood: '', city: '', state: '', zipCode: '',
};

const BR_STATES = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

export default function Checkout() {
  const { state: cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState<CheckoutAddress>(initialAddress);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAddress(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const required: (keyof CheckoutAddress)[] = ['street', 'number', 'neighborhood', 'city', 'state', 'zipCode'];
    return required.every(f => address[f] !== undefined && (address[f] as string).trim() !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const paymentData: PaymentData = {
        orderId: `ORD-${Date.now()}`,
        amount: totalPrice,
        customerName: user?.displayName ?? 'Cliente',
        customerEmail: user?.email ?? '',
        address,
        items: cart.items.map(item => ({
          id: item.product.id,
          name: `${item.product.name} (Tam. ${item.selectedSize})`,
          quantity: item.quantity,
          unitPrice: item.product.price,
        })),
      };
      const result = await paymentService.createPayment(paymentData);
      clearCart();
      navigate(result.redirectUrl ?? '/pagamento', { state: { paymentId: result.paymentId, status: result.status, amount: totalPrice } });
    } catch (err) {
      setError('Erro ao processar pagamento. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Finalizar Compra</h1>
        <div className="checkout-content">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <section className="form-section">
              <h2>Endereço de Entrega</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>CEP *</label>
                  <input name="zipCode" value={address.zipCode} onChange={handleChange} placeholder="00000-000" maxLength={9} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group flex-3">
                  <label>Rua / Avenida *</label>
                  <input name="street" value={address.street} onChange={handleChange} placeholder="Rua das Flores" required />
                </div>
                <div className="form-group flex-1">
                  <label>Número *</label>
                  <input name="number" value={address.number} onChange={handleChange} placeholder="123" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Complemento</label>
                  <input name="complement" value={address.complement ?? ''} onChange={handleChange} placeholder="Apto 42 (opcional)" />
                </div>
                <div className="form-group">
                  <label>Bairro *</label>
                  <input name="neighborhood" value={address.neighborhood} onChange={handleChange} placeholder="Centro" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group flex-2">
                  <label>Cidade *</label>
                  <input name="city" value={address.city} onChange={handleChange} placeholder="São Paulo" required />
                </div>
                <div className="form-group flex-1">
                  <label>Estado *</label>
                  <select name="state" value={address.state} onChange={handleChange} required>
                    <option value="">UF</option>
                    {BR_STATES.map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="pay-btn" disabled={loading || cart.items.length === 0}>
              {loading ? 'Processando...' : `Pagar ${totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
            </button>
          </form>

          <div className="checkout-summary">
            <h2>Resumo do Pedido</h2>
            <div className="checkout-items">
              {cart.items.map(item => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="checkout-item">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/60x60?text=T'; }}
                  />
                  <div>
                    <p className="checkout-item-name">{item.product.name}</p>
                    <p className="checkout-item-detail">Tam. {item.selectedSize} × {item.quantity}</p>
                  </div>
                  <p className="checkout-item-price">
                    {(item.product.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>
              ))}
            </div>
            <div className="checkout-total">
              <span>Total</span>
              <span>{totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
