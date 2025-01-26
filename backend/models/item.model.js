import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  dob: { type: Date, required: true },
}, { timestamps: true });

export const Item = mongoose.model("Item", itemSchema);
