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

const subCategories = {
  men: ['pendants', 'earrings', 'necklace', 'bracelets', 'sets', 'anklets'],
  women: ['pendants', 'rings', 'bracelets', 'chains'],
};

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
    min: 0,
  },
  category: {
    type: String,
    enum: ['men', 'women'],  // Updated to only men and women
    required: true,
  },
  subCategory: {
    type: String,
    validate: {
      validator: function (value) {
        return subCategories[this.category]?.includes(value);
      },
      message: (props) => `${props.value} is not a valid subcategory for ${props.instance.category}`,
    },
  },
  brand: String,
  sizes: [String],
  colors: [String],
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
export default Product;
