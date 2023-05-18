import { Request, Response } from "express";
import mongoose from "mongoose";
import TargetModel from "../Model/TargetModel";
import UserModel from "../Model/User.model";
import WalletModel from "../Model/walletModel";

export const CreateTarget = async (req: Request, res: Response) => {
  try {
    const { amount, fixedAmount, title } = req.body;
    const Dater = new Date().toDateString();
    const Wallet = await WalletModel.findById(req.params.id);
    // const getWallet = await WalletModel.findById(req.params.walletId);
    if (fixedAmount > Wallet?.Balance!) {
      return res.status(404).json({
        message: "Insufficient Funds",
      });
    } else if (fixedAmount === amount) {
      res.status(200).json({
        message: "Target Reached",
      });
    } else {
      const TargetCreated = await TargetModel.create({
        amount,
        fixedAmount,
        targetValue: true ? fixedAmount === amount : false,
        dateTime: Dater,
        title,
        interest: 0.1 * (1 / 365),
      });

      await WalletModel.findByIdAndUpdate(Wallet?._id, {
        Balance: Wallet?.Balance! - fixedAmount,
      });

      await Wallet?.Target.push(new mongoose.Types.ObjectId(TargetCreated._id));

      return res.status(200).json({
        message: "Target Created",
        data: TargetCreated,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "An error occured",
    });
  }
};
