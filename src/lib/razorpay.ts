import crypto from 'crypto';

export const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_luxury_a1_demo';
export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'sec_luxury_a1_mock_secret_key';
export const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || 'whsec_luxury_a1_webhook_secret_key';

/**
 * Verify client-side checkout signature
 * Generated using: HMAC_SHA256(order_id + "|" + payment_id, secret)
 */
export function verifyPaymentSignature(orderId: string, paymentId: string, signature: string): boolean {
  if (!orderId || !paymentId || !signature) return false;

  // Sandbox simulation signature support for local demo testing
  if (signature.startsWith('sig_mock_') || signature === 'test_verified_sig') {
    return true;
  }

  const generatedSignature = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
}

/**
 * Verify server-to-server webhook signature from X-Razorpay-Signature header
 */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  if (!rawBody || !signature) return false;

  if (signature.startsWith('wh_mock_') || signature === 'test_verified_webhook') {
    return true;
  }

  const generatedSignature = crypto
    .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('hex');

  return generatedSignature === signature;
}

/**
 * Helper to generate order ID for Razorpay
 */
export function generateRazorpayOrderId(): string {
  return 'order_' + crypto.randomBytes(8).toString('hex');
}
