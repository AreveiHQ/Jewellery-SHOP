import { NextResponse } from 'next/server';
import Product from '@/models/productModel';
import applyDiscount from '@/utils/productDiscount';
import { connect } from '@/dbConfig/dbConfig';
import { Readable } from 'stream';

import cloudinary from '@/utils/cloudinary';

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


export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const price = formData.get('price');
    const category = formData.get('category');
    const subCategory = formData.get('subCategory');
    const brand = formData.get('brand');
    const sizes = formData.get('sizes');
    const colors = formData.get('colors');
    const stock = formData.get('stock');

    // Validate fields
    if (!name || !price || !category) {
      return NextResponse.json({ message: 'Name, price, and category are required' }, { status: 400 });
    }

    const imageFiles = formData.getAll('images'); // Assumes the key for images is 'images'

    // Function to upload a single file to Cloudinary
    const uploadToCloudinary = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'Jewelry/products' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        const readableStream = new Readable();
        readableStream.push(buffer);
        readableStream.push(null); // Signifies the end of the stream
        readableStream.pipe(stream);
      });
    };

    // Upload all image files to Cloudinary
    const uploadPromises = imageFiles.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer()); // Convert file to Buffer
      return uploadToCloudinary(buffer); // Use the function to upload the Buffer
    });

    const results = await Promise.all(uploadPromises);
    const images = results.map((result) => result.secure_url);

    // Now create and save the product in the database
    const discountPrice = applyDiscount(price, 5);

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
    console.error('Error uploading product:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
