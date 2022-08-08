import mongoose from 'mongoose';

const oderSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  status: {
    type: String,
    default: 'placed',
    enum: ['placed', 'packed', 'dispatched', 'delivered'],
  },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export default mongoose.model('order', oderSchema);
