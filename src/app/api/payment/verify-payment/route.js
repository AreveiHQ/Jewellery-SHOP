import { NextResponse } from 'next/server';
import crypto from 'crypto';
import Order from '@/models/orderModel';
import Cart from '@/models/cartModel';
import { UserAuth } from '@/utils/userAuth';
import { connect } from '@/dbConfig/dbConfig';
connect();
export async function POST(req) {
  try {
    const { paymentId, address, amount, orderId, signature } = await req.json();
    const secret = process.env.RAZORPAY_SECRET; // Use environment variables for sensitive data
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(`${orderId}|${paymentId}`);
    const digest = shasum.digest('hex');
    if (digest === signature) {
    const userId =  UserAuth(req); // Assume userId is set in middleware
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }
    let order = await Order.findOne({ userId });
    if (!order) {
      order = new Order({ userId, orders: [] });
    }
    order.orders.push({
      items: cart.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      paymentStatus: 'confirmed',
      paymentId,
      address,
      orderStatus: 'confirmed',
      amount,
      signature,
      orderId,
    });
    await order.save();
    await Cart.findOneAndDelete({ userId }); // Clear the cart after placing the order
    return NextResponse.json(order, { status: 201 });
    } else {
      return NextResponse.json({ message: 'Payment verification failed' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ message: 'Error verifying payment' }, { status: 500 });
  }
}
