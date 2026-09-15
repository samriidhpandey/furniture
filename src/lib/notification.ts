export interface NotificationPayload {
  recipient: string; // phone or email
  type: 'SMS_OTP' | 'ORDER_CONFIRMATION' | 'ORDER_SHIPPED' | 'ORDER_DELIVERED' | 'ORDER_CANCELLED' | 'REFUND_PROCESSED';
  title: string;
  body: string;
  orderNumber?: string;
  meta?: Record<string, any>;
}

// In-memory audit log for viewing triggered notifications in the Admin Dashboard or tests
const notificationLog: (NotificationPayload & { timestamp: Date; id: string })[] = [];

export async function sendNotification(payload: NotificationPayload) {
  const entry = {
    ...payload,
    id: 'ntf_' + Math.random().toString(36).substring(2, 9),
    timestamp: new Date(),
  };

  notificationLog.unshift(entry);
  if (notificationLog.length > 50) notificationLog.pop();

  console.log(`\x1b[36m[A1 CONCIERGE NOTIFICATION]\x1b[0m ${payload.type} -> ${payload.recipient}: "${payload.title}"`);
  return { success: true, notificationId: entry.id };
}

export function getRecentNotifications() {
  return notificationLog;
}
