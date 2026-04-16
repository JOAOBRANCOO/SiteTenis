import { IPaymentService } from './IPaymentService';
import { PaymentData, PaymentResult, PaymentStatus } from '../../types/payment';

const paymentStore = new Map<string, PaymentStatus>();

export class MockPaymentService implements IPaymentService {
  async createPayment(data: PaymentData): Promise<PaymentResult> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const paymentId = `MOCK-${Date.now()}-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
    const status: PaymentStatus = 'paid';
    paymentStore.set(paymentId, status);
    console.log('[MockPaymentService] Payment created:', { paymentId, amount: data.amount });
    return {
      paymentId,
      status,
      message: 'Pagamento simulado com sucesso!',
      redirectUrl: `/pagamento/confirmacao/${paymentId}`,
    };
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return paymentStore.get(paymentId) ?? 'pending';
  }

  async cancelPayment(paymentId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    paymentStore.set(paymentId, 'cancelled');
    console.log('[MockPaymentService] Payment cancelled:', paymentId);
  }
}

/*
 * TODO: PagSeguro Integration
 * Replace MockPaymentService with PagSeguroPaymentService:
 *
 * import { PagSeguroPaymentService } from './pagSeguroPaymentService';
 *
 * The PagSeguroPaymentService should:
 * 1. Use VITE_PAGSEGURO_TOKEN from env vars
 * 2. POST to https://api.pagseguro.com/orders to create a charge
 * 3. Handle webhook callbacks to update payment status
 * 4. Support PIX, credit card and boleto payment methods
 *
 * See .env.example for required environment variables.
 */
