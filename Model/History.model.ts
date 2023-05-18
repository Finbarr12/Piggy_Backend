import mongoose from "mongoose";
// import { HistoryData } from "../Interface/Allinterfaces";

export interface HistoryData {
  message: string;
  transactionRefrence: number;
  transactionType: string;
}

interface Ihistory extends HistoryData, mongoose.Document {}

const HistorySchema = new mongoose.Schema<HistoryData>({
  transactionRefrence: {
    type: Number,
  },
  message: {
    type: String,
  },
  transactionType: {
    type: String,
  },
});

export default mongoose.model<Ihistory>("history", HistorySchema);
