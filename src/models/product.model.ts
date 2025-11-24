import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  stock: number;
  categoryId: mongoose.Types.ObjectId;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 1 },
  stock: { type: Number, required: true, min: 0 },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  }
});

export default mongoose.model<IProduct>("Product", ProductSchema);
