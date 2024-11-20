import { NextResponse } from 'next/server';
import Product from '@/models/productModel';
import { connect } from '@/dbConfig/dbConfig';
import { uploadToCloudinary } from '@/utils/cloudinary';
import Category from '@/models/category';
import calculatedDiscount from '@/utils/productDiscount';

connect();

// Get all products
export async function GET() {
  try {
    const products = await Product.find();
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

