import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true, index: true },
  customer: { type: String, required: true },
  items: [{
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['draft', 'sent', 'paid'], default: 'draft' },
  dueDate: { type: Date, required: true }
}, { timestamps: true });

// Clear the model from the cache if it exists
mongoose.models = {};

export default mongoose.model('Invoice', InvoiceSchema);
