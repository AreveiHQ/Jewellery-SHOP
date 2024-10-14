import { NextResponse } from 'next/server';
import Cart from '@/models/cartModel';
import { getDataFromToken } from '@/helper/getDataFromToken';

export async function POST(request) {
  const userId = await getDataFromToken(request);  // Assume `userId` is retrieved from a middleware after authentication

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }
    return NextResponse.json(cart, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error while creating cart' }, { status: 500 });
  }
}

export async function GET(request) {
  const userId = await getDataFromToken(request); // Assume `userId` is retrieved from a middleware after 
  try {
        console.log(userId)
    const cart = await Cart.findOne({ userId }).populate('items.productId'); // Populate product details
    if (!cart) {
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error while fetching cart' }, { status: 500 });
  }
}
