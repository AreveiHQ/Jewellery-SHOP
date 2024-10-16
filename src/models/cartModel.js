import mongoose from 'mongoose'

// const cartSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   items: [
//     {
//       productId: {
//         // type: mongoose.Schema.Types.ObjectId,
//         // ref: 'Product',
//         // required: true,
//         type:String,
//       },
//       quantity: {
//         type: Number,
//         required: true,
//         default: 1,
//       },
//       img_src: String,
//       name: String,
//       price: Number,
//     },
//   ],
// });


const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      productId: {
        type: String, // keep this as String if you're using a custom productId
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      img_src: String,
      name: String,
      price: Number,
    },
  ],
});


const Cart =mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;