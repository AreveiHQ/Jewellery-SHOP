import { NextResponse } from 'next/server';
import Cart from '@/models/cartModel';
import { connect } from '@/dbConfig/dbConfig';
import { UserAuth } from '@/utils/userAuth';
connect();

function handleError(error,defaultMessage=""){
  if(error.isOperational){
    return NextResponse.json({message:error.message})
}
  else{
    return NextResponse.json({message:defaultMessage||error.message},{ status: 500 })
  }
}
export async function POST(request) {
  const userId =  UserAuth(request);  // Assume `userId` is retrieved from a middleware after authentication
  
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
  try {
    const userId =  UserAuth(request);

    const cart = await Cart.findOne({ userId }).populate('items.productId'); // Populate product details
    if (!cart) {
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message,message:'Server error while fetching cart'}, { status: 500 });
  }
}
