import nodemailer from 'nodemailer'
import type { NextApiRequest, NextApiResponse } from 'next'

type EmailData = {
  to: string
  playerIGN: string
  totalINR: number
  items: Array<{ name: string; qty: number; priceINR: number }>
  receiptId: string
  timestamp: string
  coupon?: string
}

// Configure your email service here
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

function generateEmailHTML(data: EmailData): string {
  const itemsHTML = data.items
    .map(
      item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #000000ff; font-family: Arial, sans-serif;">${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #000000ff; text-align: center; font-family: Arial, sans-serif;">${item.qty}</td>
      <td style="padding: 12px; border-bottom: 1px solid #000000ff; text-align: right; font-family: Arial, sans-serif;">₹${item.priceINR.toLocaleString('en-IN')}</td>
    </tr>
  `
    )
    .join('')

  const couponHTML = data.coupon ? `<div style="margin: 16px 0; color: #059669; font-weight: bold;">${data.coupon}</div>` : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
    .container { background-color: #fff; max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .header { text-align: center; border-bottom: 3px solid #fcff38ff; padding-bottom: 20px; margin-bottom: 30px; }
    .logo { font-size: 32px; font-weight: bold; color: #3429ffff; }
    .subtitle { color: #666; font-size: 14px; margin-top: 5px; }
    .greeting { font-size: 18px; color: #333; margin: 20px 0; }
    .receipt-id { background-color: #f0f4ff; padding: 15px; border-left: 4px solid #f2ff3aff; margin: 20px 0; font-family: monospace; font-size: 12px; }
    .receipt-label { font-size: 12px; color: #666; text-transform: uppercase; }
    .table { width: 100%; border-collapse: collapse; margin: 30px 0; }
    .table-header { background-color: #f9f9f9; }
    .table-header th { padding: 12px; text-align: left; font-weight: bold; color: #333; border-bottom: 2px solid #3328ffff; }
    .total-row { background-color: #f0f4ff; }
    .total-row td { padding: 15px 12px; font-weight: bold; font-size: 16px; color: #2c21ffff; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px; }
    .status { color: #10B981; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">MineClash</div>
      <div class="subtitle">Receipt & Order Confirmation</div>
    </div>

    <div class="greeting">Hi <strong>${data.playerIGN}</strong>,</div>
    <p style="color: #666; line-height: 1.6;">
      Thank you for your purchase! Your order has been received and verified. Below are your order details:
    </p>

    <div class="receipt-id">
      <div class="receipt-label">Receipt ID</div>
      <div style="font-size: 14px; margin-top: 5px;">${data.receiptId}</div>
    </div>

    <table class="table">
      <thead class="table-header">
        <tr>
          <th>Item</th>
          <th style="text-align: center;">Qty</th>
          <th style="text-align: right;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHTML}
        <tr class="total-row">
          <td colspan="2" style="text-align: right; padding: 15px 12px;">Total:</td>
          <td style="text-align: right; padding: 15px 12px;">₹${data.totalINR.toLocaleString('en-IN')}</td>
        </tr>
      </tbody>
    </table>

    ${couponHTML}
    <p style="color: #666; line-height: 1.6;">
      <strong>Status:</strong> <span class="status">✓ Payment Verified</span>
    </p>

    <p style="color: #666; line-height: 1.6;">
      Your items will be delivered to your account once shown to our staff. Thank you for choosing MineClash!
    </p>

    <p style="color: #666; line-height: 1.6;">
      <strong>Order Date:</strong> ${data.timestamp}
    </p>

    <div class="footer">
      <p>If you have any questions, reply to this email or contact us at <a href="mailto:mineclash24h@gmail.com" style="color: #4F46E5; text-decoration: none;">mineclash24h@gmail.com</a></p>
      <p>© 2026 MineClash. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API /api/send-email called", req.body);
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const emailData: EmailData = req.body
    console.log("Preparing to send email to:", emailData.to);
    // Send email
    await transporter.sendMail({
      from: `MineClash Support <${process.env.EMAIL_USER}>`,
      to: emailData.to,
      subject: `MineClash Receipt - Order #${emailData.receiptId}`,
      html: generateEmailHTML(emailData)
    })
    console.log("Email sent successfully to:", emailData.to);
    res.status(200).json({ success: true, message: 'Email sent successfully' })
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: 'Failed to send email', details: error instanceof Error ? error.message : error })
  }
}
