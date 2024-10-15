import { NextResponse } from 'next/server';
import Product from '@/models/productModel';
import { connect } from '@/dbConfig/dbConfig';
connect();
export async function GET(request, { params }) {
  const { category } = params;
  const validCategories = ['men', 'women', 'kids'];

  if (!validCategories.includes(category.toLowerCase())) {
    return NextResponse.json({ message: 'Invalid category' }, { status: 400 });
  }

  try {
    const products = await Product.find({ category: category.toLowerCase() }).sort({ createdAt: -1 });
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
