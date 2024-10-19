import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { razorpay_secret_key } from '@/utils/secrets';

export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    const secret = razorpay_secret_key; // Use environment variables for sensitive data

    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');
    if (digest === razorpay_signature) {
      return NextResponse.json({ message: 'Payment verified' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Payment verification failed' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ message: 'Error verifying payment' }, { status: 500 });
  }
}
