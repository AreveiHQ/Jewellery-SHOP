import razorpayInstance from '@/utils/razorpayInstance';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { amount } = await req.json();
    const amountInPaise = Math.round(amount * 100);

    const options = {
      amount: amountInPaise, // amount in paise
      currency: 'INR',
      receipt: 'receipt#1',
    };

    const order = await razorpayInstance.orders.create(options);
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ message: 'Error creating Razorpay order' }, { status: 500 });
  }
}
