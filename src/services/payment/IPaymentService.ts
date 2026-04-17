import { PaymentData, PaymentResult, PaymentStatus } from '../../types/payment';

export interface IPaymentService {
  createPayment(data: PaymentData): Promise<PaymentResult>;
  getPaymentStatus(paymentId: string): Promise<PaymentStatus>;
  cancelPayment(paymentId: string): Promise<void>;
}
