// models/Product.ts
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productID:{type:String,required:true,unique:true},
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    category: { type: String },
    brand: { type: String },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    shortDescription: { type: String },
    description: { type: String },
    size:[{type:String,required:true}],
    image: { type: String },
    tags: [{ type: String }],
    discount: { type: Number, default: 0 },
    isDiscount: { type: Boolean, default: false },
    status: { type: String, default: "new" }, // best-selling, new, etc.
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
