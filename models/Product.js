import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  // Add other fields as needed
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);