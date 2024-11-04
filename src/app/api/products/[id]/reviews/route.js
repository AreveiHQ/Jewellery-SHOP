import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Product from '@/models/productModel';
import { connect } from '@/dbConfig/dbConfig';
import { getServerCookie } from '@/utils/serverCookie';

connect();

const JWT_SECRET = process.env.JWT_SECRET;

// Create a review for a specific product
export async function POST(request, { params }) {
  const { id } = params;
  const { rating, comment } = await request.json();

  if (!rating || !comment || rating < 1 || rating > 5) {
    return NextResponse.json({ message: 'Invalid rating or comment' }, { status: 400 });
  }

  try {
   
    const token = await getServerCookie('token'); 
    if (!token) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }

   
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log('Decoded JWT:', decoded);
    const userId = decoded?.userId;

    if (!userId) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    // Create the review object
    const review = {
      user: userId,
      rating: Number(rating),
      comment,
    };

    // Add review to the product's reviews array
    product.reviews.push(review);

    // Calculate the new average rating
    product.numReviews = product.reviews.length;
    product.averageRating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();

    return NextResponse.json({ message: 'Review added successfully', product }, { status: 201 });
  } catch (error) {
    console.error('Server error:', error.message);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

// Get all reviews for a specific product
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const product = await Product.findById(id).populate('reviews.user', 'name');

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product.reviews, { status: 200 });
  } catch (error) {
    console.error('Server error:', error.message);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
