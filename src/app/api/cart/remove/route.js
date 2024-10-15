import { NextResponse } from 'next/server';
import Cart from '@/models/cartModel';
import { connect } from '@/dbConfig/dbConfig';
import { UserAuth } from '@/utils/userAuth';
connect();
export async function DELETE(request) {
  const userId =  UserAuth(request);  // Assume `userId` is retrieved from a middleware after authentication
  const { productId } = await request.json();

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error while removing product from cart' }, { status: 500 });
  }
}
