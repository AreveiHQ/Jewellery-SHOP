import { NextResponse } from 'next/server';
import Product from '@/models/productModel';

// Create a review for a specific product
export async function POST(request, { params }) {
  const { id } = params;
  const { rating, comment } = await request.json();

  try {
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    const review = {
      user: request.userId, // Assuming `userId` is available in the request context after authentication
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);

    // Update average rating and number of reviews
    product.numReviews = product.reviews.length;
    product.averageRating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();

    return NextResponse.json({ message: 'Review added successfully', product }, { status: 201 });
  } catch (error) {
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
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
