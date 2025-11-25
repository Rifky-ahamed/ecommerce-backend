import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  stock?: string;
  categoryId: mongoose.Types.ObjectId; // required
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: String },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
