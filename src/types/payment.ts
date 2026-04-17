export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'cancelled';

export interface PaymentData {
  orderId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  address: CheckoutAddress;
  items: PaymentItem[];
}

export interface PaymentItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface CheckoutAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PaymentResult {
  paymentId: string;
  status: PaymentStatus;
  message: string;
  redirectUrl?: string;
}
