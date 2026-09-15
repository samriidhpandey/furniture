export const SELLER_STATE = 'Maharashtra';
export const SELLER_GSTIN = '27AABCA1234F1Z5';
export const SELLER_HSN_CODE = '9403'; // Indian HSN code for Luxury Wooden & Metal Furniture
export const GST_RATE = 0.18; // 18% GST

export interface GstBreakdown {
  taxableAmount: number;
  cgstRate: number;
  cgstAmount: number;
  sgstRate: number;
  sgstAmount: number;
  igstRate: number;
  igstAmount: number;
  totalTax: number;
  totalAmount: number;
  isInterState: boolean;
}

export function calculateGst(subtotal: number, discount: number = 0, buyerState: string = 'Maharashtra'): GstBreakdown {
  const taxableAmount = Math.max(0, subtotal - discount);
  const normalizedBuyerState = buyerState.trim().toLowerCase();
  const normalizedSellerState = SELLER_STATE.toLowerCase();

  const isInterState = normalizedBuyerState !== '' && normalizedBuyerState !== normalizedSellerState;

  if (isInterState) {
    const igstRate = GST_RATE;
    const igstAmount = Math.round(taxableAmount * igstRate);
    const totalTax = igstAmount;
    const totalAmount = taxableAmount + totalTax;

    return {
      taxableAmount,
      cgstRate: 0,
      cgstAmount: 0,
      sgstRate: 0,
      sgstAmount: 0,
      igstRate,
      igstAmount,
      totalTax,
      totalAmount,
      isInterState: true,
    };
  } else {
    const halfRate = GST_RATE / 2; // 9%
    const cgstAmount = Math.round(taxableAmount * halfRate);
    const sgstAmount = Math.round(taxableAmount * halfRate);
    const totalTax = cgstAmount + sgstAmount;
    const totalAmount = taxableAmount + totalTax;

    return {
      taxableAmount,
      cgstRate: halfRate,
      cgstAmount,
      sgstRate: halfRate,
      sgstAmount,
      igstRate: 0,
      igstAmount: 0,
      totalTax,
      totalAmount,
      isInterState: false,
    };
  }
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
