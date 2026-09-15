'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { formatINR, calculateGst, SELLER_GSTIN, SELLER_HSN_CODE, SELLER_STATE } from '@/lib/gst';
import { Printer, Download, ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function InvoicePage() {
  const params = useParams();
  const id = params.id as string;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.order) setOrder(data.order);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <p className="font-serif text-lg text-charcoal">Rendering GST Tax Invoice Document...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="font-serif text-2xl">Invoice Not Found</h1>
        <Link href="/" className="text-xs uppercase tracking-wider underline">
          Return Home
        </Link>
      </div>
    );
  }

  const parsedAddress = order.parsedAddress || {};
  const isInterState = order.igst > 0;
  const invoiceDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-10 px-4 sm:px-6">
      {/* Action Header Bar (Hidden when printing) */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center no-print">
        <Link
          href={`/order/${order.orderNumber}`}
          className="text-xs uppercase tracking-wider text-charcoal hover:text-bronze flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Consignment Status</span>
        </Link>

        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-charcoal text-cream hover:bg-bronze hover:text-charcoal transition-colors text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Formal Tax Invoice Document (§21-B) */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-300 p-8 sm:p-12 shadow-lg text-gray-900 font-sans print:shadow-none print:border-0 print:p-0">
        {/* Invoice Title & Logo */}
        <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-gray-900 pb-6 gap-4">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500 font-semibold">
              Original For Recipient
            </span>
            <h1 className="font-serif text-3xl font-bold tracking-wider text-gray-900 uppercase mt-0.5">
              TAX INVOICE
            </h1>
            <p className="text-xs text-gray-600 mt-1">Issued under Section 31 of the CGST Act, 2017</p>
          </div>

          <div className="sm:text-right">
            <span className="font-serif text-xl font-bold tracking-[0.2em] text-gray-900 uppercase">
              A1 LUXURY FURNITURE
            </span>
            <p className="text-[10px] tracking-[0.25em] text-gray-600 uppercase">Atelier India Private Limited</p>
            <p className="text-xs text-gray-700 mt-1 font-mono">CIN: U36100MH2021PTC369401</p>
          </div>
        </div>

        {/* Invoice Meta Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-gray-200 text-xs">
          <div>
            <span className="text-gray-500 uppercase text-[10px] block">Invoice No:</span>
            <span className="font-mono font-bold text-gray-900">INV-{order.orderNumber}</span>
          </div>
          <div>
            <span className="text-gray-500 uppercase text-[10px] block">Invoice Date:</span>
            <span className="font-medium text-gray-900">{invoiceDate}</span>
          </div>
          <div>
            <span className="text-gray-500 uppercase text-[10px] block">Payment Ref (Razorpay):</span>
            <span className="font-mono text-gray-900">{order.razorpayPaymentId || 'PRE-AUTH-SETTLED'}</span>
          </div>
          <div>
            <span className="text-gray-500 uppercase text-[10px] block">Place of Supply:</span>
            <span className="font-medium text-gray-900">{parsedAddress.state || 'Maharashtra'}</span>
          </div>
        </div>

        {/* Seller & Buyer Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6 border-b border-gray-200 text-xs">
          {/* Seller */}
          <div className="space-y-1">
            <p className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">
              Supplier / Consignor Details:
            </p>
            <p className="font-semibold text-gray-900">A1 Luxury Furniture India Pvt Ltd</p>
            <p className="text-gray-600">The Penthouse Gallery, Level 14, Palladium Annex</p>
            <p className="text-gray-600">High Street Phoenix, Lower Parel, Mumbai 400013</p>
            <p className="text-gray-800 font-medium">State: Maharashtra (State Code: 27)</p>
            <p className="font-mono font-bold text-gray-900 pt-1">GSTIN: {SELLER_GSTIN}</p>
          </div>

          {/* Buyer */}
          <div className="space-y-1">
            <p className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">
              Billed & Delivered To:
            </p>
            <p className="font-semibold text-gray-900">{parsedAddress.fullName}</p>
            <p className="text-gray-600">{parsedAddress.line1}</p>
            {parsedAddress.line2 && <p className="text-gray-600">{parsedAddress.line2}</p>}
            <p className="text-gray-600">
              {parsedAddress.city}, {parsedAddress.state} - {parsedAddress.postalCode}
            </p>
            <p className="text-gray-800 font-medium">State: {parsedAddress.state || 'Maharashtra'}</p>
            <p className="font-mono text-gray-900">Phone: {parsedAddress.phone}</p>
            {order.buyerGstin ? (
              <p className="font-mono font-bold text-gray-900 pt-1">
                Buyer GSTIN: {order.buyerGstin} (B2B Tax Credit Eligible)
              </p>
            ) : (
              <p className="text-gray-500 pt-1">Recipient Category: B2C Retail Consumer</p>
            )}
          </div>
        </div>

        {/* Itemized Table (§21-B) */}
        <div className="py-6 border-b border-gray-200 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-[10px] tracking-wider border-y border-gray-300">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Item Description & Finish</th>
                <th className="py-2.5 px-3">HSN Code</th>
                <th className="py-2.5 px-3 text-center">Qty</th>
                <th className="py-2.5 px-3 text-right">Unit Rate (₹)</th>
                <th className="py-2.5 px-3 text-right">Taxable Value (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {order.items?.map((item: any, idx: number) => (
                <tr key={item.id}>
                  <td className="py-3 px-3 font-mono text-gray-500">{idx + 1}</td>
                  <td className="py-3 px-3">
                    <p className="font-semibold text-gray-900">{item.productName}</p>
                    <p className="text-[11px] text-gray-500">{item.variantSummary}</p>
                  </td>
                  <td className="py-3 px-3 font-mono">{SELLER_HSN_CODE}</td>
                  <td className="py-3 px-3 text-center font-mono">{item.quantity}</td>
                  <td className="py-3 px-3 text-right font-mono">{item.unitPrice.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3 text-right font-mono font-medium">
                    {item.totalPrice.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tax Breakdown Grid */}
        <div className="py-6 border-b border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="space-y-2">
            <p className="font-bold text-gray-900 uppercase tracking-wider text-[10px]">
              Statutory Tax Declarations:
            </p>
            <p className="text-gray-600 text-[11px]">
              • Whether tax is payable on Reverse Charge basis: <strong>No</strong>
            </p>
            <p className="text-gray-600 text-[11px]">
              • Goods supplied conform to IS/ISO furniture structural integrity standards.
            </p>
            <p className="text-gray-600 text-[11px]">
              • White-glove assembly and packaging disposal included with consignment.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between py-1 text-gray-700">
              <span>Gross Taxable Amount:</span>
              <span className="font-mono">{formatINR(order.subtotal - order.discount)}</span>
            </div>

            {!isInterState ? (
              <>
                <div className="flex justify-between py-1 text-gray-700">
                  <span>Central GST (CGST @ 9%):</span>
                  <span className="font-mono">{formatINR(order.cgst)}</span>
                </div>
                <div className="flex justify-between py-1 text-gray-700">
                  <span>State GST (SGST @ 9%):</span>
                  <span className="font-mono">{formatINR(order.sgst)}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between py-1 text-gray-700">
                <span>Integrated GST (IGST @ 18%):</span>
                <span className="font-mono">{formatINR(order.igst)}</span>
              </div>
            )}

            <div className="flex justify-between py-2 border-t-2 border-gray-900 text-sm font-bold text-gray-900">
              <span>Total Invoice Amount (INR):</span>
              <span className="font-mono text-base">{formatINR(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Signatory & Footer */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-end gap-6 text-xs text-gray-600">
          <div className="space-y-1">
            <p className="font-semibold text-gray-900">A1 Luxury Furniture Concierge</p>
            <p>Support Desk: concierge@a1furniture.com | +91 (022) 6940 8800</p>
            <p className="text-[10px] text-gray-500">
              This is a computer-generated invoice authenticated under Digital Signature rules.
            </p>
          </div>

          <div className="text-center sm:text-right space-y-2">
            <div className="w-32 border-b border-gray-400 mx-auto sm:ml-auto pb-6">
              <span className="font-serif italic text-sm text-gray-700">Aarya Merchant</span>
            </div>
            <p className="font-semibold text-gray-900 text-[11px]">Authorized Signatory</p>
            <p className="text-[10px] text-gray-500">For A1 Luxury Furniture India Pvt Ltd</p>
          </div>
        </div>
      </div>
    </div>
  );
}
