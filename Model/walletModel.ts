import mongoose from "mongoose";

interface WalletData {
  Balance: number;
  credit: number;
  debit: number;
  quickSave: {}[];
  saveLock: {}[];
  Target: {}[];
  Invest: {}[];
}

interface Iwallet extends WalletData, mongoose.Document {}

const WalletSchema = new mongoose.Schema<WalletData>({
  Balance: {
    type: Number,
  },
  debit: {
    type: Number,
  },
  credit: {
    type: Number,
  },

  quickSave: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "quicksaves",
    },
  ],

  saveLock: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "savelocks",
    },
  ],

  Target: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "targets",
    },
  ],
  Invest: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "invests",
    },
  ],
});

export default mongoose.model<Iwallet>("wallets", WalletSchema);
