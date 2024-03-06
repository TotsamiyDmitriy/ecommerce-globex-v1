import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brandName: { type: String, required: true },
    soldBy: { type: String, required: true },
    authorRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, default: 0 },
    reviewsCount: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    offers: { type: Array },
    photos: [{ type: String, required: true }],
    sizes: [{ type: String, required: true }],
    colors: [{ type: String, required: true }],
    category: { type: String, required: true },
  },
  { timestamps: true },
);

const Product = mongoose.model('Product', productSchema);

export default Product;
