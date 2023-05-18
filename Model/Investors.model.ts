import mongoose from "mongoose";
import { investors } from "../Interface/AllInterfaces";

interface MainData extends investors, mongoose.Document {}

const QuickSchema = new mongoose.Schema<investors>(
  {
    investorId: {
      type: String,
    },

    amount: {
      type: Number,
    },

    unit: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model<MainData>("investors", QuickSchema);
