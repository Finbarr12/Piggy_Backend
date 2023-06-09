import mongoose from "mongoose";
import { TargetData } from "../Interface/AllInterfaces";

interface MainData extends TargetData, mongoose.Document {}

const TargetSchema = new mongoose.Schema<TargetData>(
  {
    amount: {
      type: Number,
    },

    targetValue: {
      type: Boolean,
    },

    fixedAmount: {
      type: Number,
    },

    interest: {
      type: Number,
    },
    dateTime: {
      type: String,
    },

    title: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<MainData>("targets", TargetSchema);
