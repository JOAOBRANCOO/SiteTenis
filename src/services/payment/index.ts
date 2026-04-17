import { MockPaymentService } from './mockPaymentService';

// Switch this import to use PagSeguroPaymentService when ready
export const paymentService = new MockPaymentService();
export type { IPaymentService } from './IPaymentService';
