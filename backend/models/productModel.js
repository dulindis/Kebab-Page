import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    countInStock: { type: Number, required: true },
    flavour: { type: String },
    rating: { type: Number, required: true },
    numReviews: { type: Number },
    description: { type: String },
    variants: {
      name: { type: String },
      slug: { type: String },
      image: { type: String },
      countInStock: { type: Number },
      price: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
