import { NextResponse } from 'next/server';
import Cart from '@/models/cartModel';
import { connect } from '@/dbConfig/dbConfig';
import { UserAuth } from '@/utils/userAuth';
connect();
export async function POST(request) {
  const userId =  UserAuth(request);  // Assume `userId` is retrieved from a middleware after authentication
  const { productId, img_src, name, price, quantity } = await request.json();

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, img_src, name, price, quantity });
    }

    await cart.save();
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error while adding to cart' }, { status: 500 });
  }
}
