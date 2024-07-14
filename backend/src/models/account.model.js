import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Account = mongoose.model('Account', accountSchema);
