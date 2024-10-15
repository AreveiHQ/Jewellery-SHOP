import { NextResponse } from 'next/server';
import Product from '@/models/productModel';
import { connect } from '@/dbConfig/dbConfig';
connect();
export async function GET(request, { params }) {
  const { category, subcategory } = params;
  const validCategories = ['men', 'women', 'kids'];
  const subCategories = {
    men: ['shirts', 'trousers', 'shoes'],
    women: ['dresses', 'handbags', 'shoes'],
    kids: ['toys', 'clothing', 'shoes'],
  };

  // Validate category
  if (!validCategories.includes(category.toLowerCase())) {
    return NextResponse.json({ message: 'Invalid category' }, { status: 400 });
  }

  // Validate subcategory
  if (!subCategories[category.toLowerCase()]?.includes(subcategory.toLowerCase())) {
    return NextResponse.json({ message: 'Invalid subcategory' }, { status: 400 });
  }

  try {
    const products = await Product.find({
      category: category.toLowerCase(),
      subCategory: subcategory.toLowerCase(),
    }).sort({ createdAt: -1 });

    if (products.length === 0) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
