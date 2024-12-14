import { NextResponse } from 'next/server';
import crypto from 'crypto';
import Order from '@/models/orderModel';
import Cart from '@/models/cartModel';
import { UserAuth } from '@/utils/userAuth';
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import Address from '@/models/addressModel';

export async function POST(req) {
  await connect();
  try {
    const { paymentId, addressID, amount, orderId, signature } = await req.json();
    const secret = process.env.RAZORPAY_SECRET; // Use environment variables for sensitive data
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(`${orderId}|${paymentId}`);
    const digest = shasum.digest('hex');
    if (digest === signature) {
    const userId = await UserAuth(); // Assume userId is set in middleware
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }
    const address = await Address.findById(addressID);
        if (!address) {
            return NextResponse.json({
                message: " Address Not Found"
            }, { status: 404 });
        }
    let order = await Order.findOne({ userId });
    if (!order) {
      order = new Order({ userId, orders: [] });
    }
    order.orders.push({
      items: cart.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price:item.discountedPrice
      })),
      paymentStatus: 'confirmed',
      paymentId,
      address:`${address.firstName} ${address.lastName} , ${address.contact} , ${address.landmark} ${address.street} ${address.city} ${address.state}` ,
      orderStatus: 'confirmed',
      amount,
      signature,
      orderId,
    });
    await order.save();
    await Cart.findOneAndDelete({ userId }); // Clear the cart after placing the order
     user.cart = null;
     await user.save();
    return NextResponse.json(order, { status: 201 });
    } else {
      return NextResponse.json({ message: 'Payment verification failed' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ message: 'Error verifying payment' }, { status: 500 });
  }
}
