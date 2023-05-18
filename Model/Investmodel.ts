import mongoose from "mongoose";
import { Invest } from "../Interface/AllInterfaces";

interface MainData extends Invest, mongoose.Document {}

const QuickSchema = new mongoose.Schema<Invest>(
  {
    title: {
      type: String,
    },

    percentagePerUnit: {
      type: Number,
    },

    amountPerUnit: {
      type: Number,
    },

    description: {
      type: String,
    },
    startTime: {
      type: String,
    },
    duration: {
      type: String,
    },
    category: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    totalUnit: {
      type: Number,
    },
    investors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "investors",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<MainData>("invest", QuickSchema);
