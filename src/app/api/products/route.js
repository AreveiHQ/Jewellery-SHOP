import { NextResponse } from 'next/server';
import Product from '@/models/productModel';
import cloudinary from '@/lib/config/cloudinaryConfigration';
import applyDiscount from '@/utils/productDiscount';
import { connect } from '@/dbConfig/dbConfig';
connect();
// Utility function for error response
const handleError = (error) => NextResponse.json({ message: error.message }, { status: 500 });

// Get all products
export async function GET() {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

// Create a new product
export async function POST(request) {
  const { name, description, price, category, subCategory, brand, sizes, colors, stock } = await request.json();
  
  if (!name || !price || !category) {
    return NextResponse.json({ message: 'Name, price, and category are required' }, { status: 400 });
  }

  try {
    const uploadPromises = req.files.map((file) =>
      cloudinary.v2.uploader.upload(file.path, {
        folder: 'Jewellery/products',
      }).then(result => ({ result })).catch(error => ({ error, filePath: file.path }))
    );

    const discountPrice = applyDiscount(price, 5);
    const results = await Promise.all(uploadPromises);
    const images = results.map(({ result }) => result.secure_url);

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      category: category.toLowerCase(),
      subCategory: subCategory.toLowerCase(),
      brand,
      sizes,
      colors,
      images,
      stock,
    });

    const newProduct = await product.save();
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
