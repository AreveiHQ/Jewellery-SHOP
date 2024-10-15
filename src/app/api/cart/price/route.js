import { NextResponse } from 'next/server';
import Cart from '@/models/cartModel';
import { connect } from '@/dbConfig/dbConfig';
import { UserAuth } from '@/utils/userAuth';
connect();
export async function GET(request) {
  const userId =  UserAuth(request);  // Assume `userId` is retrieved from a middleware after authentication

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }

    const total = cart.items.reduce((acc, item) => acc + item.productId.price * item.quantity, 0).toFixed(2);

    return NextResponse.json({ total }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
