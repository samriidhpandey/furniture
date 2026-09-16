// Memory store for resilient order persistence across serverless & SQLite sessions

export interface StoredOrder {
  id: string;
  orderNumber: string;
  status: 'PENDING' | 'CONFIRMED' | 'PAID' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';
  totalAmount: number;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  shippingAddress: string;
  buyerGstin?: string | null;
  razorpayOrderId?: string | null;
  razorpayPaymentId?: string | null;
  razorpaySignature?: string | null;
  trackingNumber?: string | null;
  courierName?: string | null;
  userId?: string | null;
  createdAt: string;
  items: {
    id: string;
    productId: string;
    variantId?: string | null;
    productName: string;
    variantSummary: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
}

const GLOBAL_ORDERS_KEY = '__A1_ORDERS_STORE__';

const getGlobalOrders = (): StoredOrder[] => {
  if (!(globalThis as any)[GLOBAL_ORDERS_KEY]) {
    (globalThis as any)[GLOBAL_ORDERS_KEY] = [];
  }
  return (globalThis as any)[GLOBAL_ORDERS_KEY];
};

export const saveOrderToStore = (order: StoredOrder): StoredOrder => {
  const store = getGlobalOrders();
  const existingIdx = store.findIndex((o) => o.id === order.id || o.orderNumber === order.orderNumber || o.razorpayOrderId === order.razorpayOrderId);
  if (existingIdx >= 0) {
    store[existingIdx] = { ...store[existingIdx], ...order };
    return store[existingIdx];
  }
  store.unshift(order);
  return order;
};

export const findOrderByRazorpayId = (razorpayOrderId: string): StoredOrder | undefined => {
  const store = getGlobalOrders();
  return store.find((o) => o.razorpayOrderId === razorpayOrderId);
};

export const findOrderByOrderNumber = (orderNumber: string): StoredOrder | undefined => {
  const store = getGlobalOrders();
  return store.find((o) => o.orderNumber === orderNumber || o.id === orderNumber);
};

export const getAllStoredOrders = (): StoredOrder[] => {
  return [...getGlobalOrders()];
};
