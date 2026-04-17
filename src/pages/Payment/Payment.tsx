import { useLocation, useParams, Link } from 'react-router-dom';
import './Payment.css';

interface PaymentState {
  paymentId?: string;
  status?: string;
  amount?: number;
}

export default function Payment() {
  const location = useLocation();
  const { paymentId: urlPaymentId } = useParams<{ paymentId?: string }>();
  const state = location.state as PaymentState | null;

  const paymentId = state?.paymentId ?? urlPaymentId ?? '';
  const status = state?.status ?? 'paid';
  const amount = state?.amount;

  const isSuccess = status === 'paid';

  return (
    <div className="payment-page">
      <div className="payment-container">
        {isSuccess ? (
          <div className="payment-success">
            <div className="payment-icon success-icon">✓</div>
            <h1>Pagamento Confirmado!</h1>
            <p className="payment-subtitle">Seu pedido foi realizado com sucesso.</p>
            {paymentId && (
              <div className="payment-info">
                <p><strong>ID do Pagamento:</strong> {paymentId}</p>
                {amount !== undefined && (
                  <p><strong>Valor:</strong> {amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                )}
                <p><strong>Status:</strong> <span className="status-paid">Pago</span></p>
              </div>
            )}
            <div className="payment-notice">
              <p>⚡ Esta é uma simulação de pagamento (modo mock).</p>
              <p>Em produção, este fluxo seria integrado com o PagSeguro.</p>
            </div>
            <div className="payment-actions">
              <Link to="/produtos" className="payment-btn-primary">Continuar Comprando</Link>
              <Link to="/" className="payment-btn-secondary">Ir para o Início</Link>
            </div>
          </div>
        ) : (
          <div className="payment-failed">
            <div className="payment-icon failed-icon">✗</div>
            <h1>Pagamento Não Aprovado</h1>
            <p>Ocorreu um problema com seu pagamento. Por favor, tente novamente.</p>
            <div className="payment-actions">
              <Link to="/carrinho" className="payment-btn-primary">Voltar ao Carrinho</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
