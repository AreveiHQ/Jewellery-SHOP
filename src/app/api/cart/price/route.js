import { NextResponse } from 'next/server';
import Cart from '@/models/cartModel';
import { connect } from '@/dbConfig/dbConfig';
import { UserAuth } from '@/utils/userAuth';

connect();

export async function GET(request) {
  const userId = UserAuth(request); // Assume `userId` is retrieved from a middleware after authentication

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }

    const total = cart.items.reduce((acc, item) => {
      const price = item.productId?.price; // Optional chaining
      const quantity = item.quantity || 1; // Default to 1 if quantity is not defined

      // Log for debugging
      console.log(`Item ID: ${item.productId?._id}, Price: ${price}, Quantity: ${quantity}`);

      if (typeof price !== 'number' || isNaN(price)) {
        console.error(`Invalid price for item ${item.productId?._id}: ${price}`);
        return acc; // Skip this item
      }

      return acc + price * quantity; // Calculate total
    }, 0).toFixed(2);
 // Calculate total and fix to 2 decimal points

    return NextResponse.json({ total }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cart:', error); // Log the error for debugging
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
