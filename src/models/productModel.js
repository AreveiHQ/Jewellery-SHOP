import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discountPrice: {
    type: Number,
    required:true,
    min: 0,
  },
  discountPercent:{
    type:Number,
    min:0,
    max:100,
    required:true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  collectionName:{
    type:String,
  },
  metal: {
    type: String,
    enum: ['silver', 'gold', 'platinum', 'rose gold'],
    default: 'silver',
  },
  images: [String],
  stock: {
    type: Number,
    default: 0,
  },
  reviews: [reviewSchema],
  averageRating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
Product.createIndexes({ name: "text", description: "text", category:"text",subCategory:"text",collection:"text"})
export default Product;
