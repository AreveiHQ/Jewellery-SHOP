import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import Category from '@/models/category';
import { uploadToCloudinary } from '@/utils/cloudinary'; // Assuming this is your utility for Cloudinary

connect();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name').toLowerCase();
    const banners = formData.getAll('bannerImages');
    const imageFile = formData.get('image');
    const parentCategory = formData.get('parentCategory').toLowerCase();

    // Check if category already exists
    const isExist = await Category.findOne({ name });
    if (isExist && isExist.parentCategory === parentCategory) {
      return NextResponse.json({ message: 'Category Already Exists' }, { status: 403 });
    }

    // Handle banner images upload
    const bannerUploadPromises = banners.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer()); // Convert file to Buffer
      return uploadToCloudinary(buffer, '/category/banners'); // Upload to Cloudinary
    });

    // Handle single image upload
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer()); // Convert file to Buffer
    const uploadedImage = await uploadToCloudinary(imageBuffer, '/category/image'); // Upload to Cloudinary

    // Wait for all banner images to be uploaded
    const bannersResponse = await Promise.all(bannerUploadPromises);
    const bannerImages = bannersResponse.map((result) => result.secure_url);

    // Create a new category
    const newCategory = new Category({
      name,
      bannerImages,
      image: uploadedImage.secure_url,
      parentCategory,
    });

    // Save the category to the database
    await newCategory.save();

    return NextResponse.json({ message: 'Category Added Successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error adding category:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}