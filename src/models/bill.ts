import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  billDate: { type: String, required: true },
  payedDate: { type: String, required: true },
  unitConsumed: { type: Number, require: true },
  amount: { type: Number, require: true },
});

export default mongoose.model('User', billSchema);
