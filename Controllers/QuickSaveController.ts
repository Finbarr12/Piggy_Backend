import QuickSave from "../Model/QuickSave";
import { Request, Response } from "express";
import WalletModel from "../Model/walletModel";
import mongoose from "mongoose";
import cron from "node-cron";

export const CreateQuickSave = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const getwallet = await WalletModel.findById(req.params.walletId);

    const newDate = new Date().toDateString();

    if (amount > getwallet?.Balance!) {
      return res.status(404).json({
        message: "Insufficient Funds",
      });
    } else {
      const Creating = await QuickSave.create({
        amount,
        autoSave: false,
        dateTime: newDate,
        interest: 0.1,
      });

      getwallet?.quickSave!.push(new mongoose.Types.ObjectId(Creating?._id));
      getwallet?.save();
    }
    return res.status(200).json({
      message: "Quick save created successfully",
    });
  } catch (err) {
    return res.status(404).json({
      message: "an error occured",
    });
  }
};

export const ClaimDailyInterest = async (req: Request, res: Response) => {
  try {
    const getSaveId = await QuickSave.findById(req.params.SaveId);

    const dailyInterest = 0.1 * (1 / 365);

    const int = await QuickSave.findById(getSaveId?._id, {
      amount: getSaveId?.amount! * dailyInterest + getSaveId?.amount!,
    });

    await cron.schedule("* * * * *", () => {
      return int;
    });

    res.status(200).json({
      message: "sucessful",
    });
  } catch (error) {
    return res.status(404).json({
      message: "an error occured",
    });
  }
};
