import UserModel from "../Model/User.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import WalletModel from "../Model/walletModel";
import mongoose from "mongoose";
import HistoryModel from "../Model/History.model";

export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, userName, PhoneNo } = req.body;
    const salt = await bcrypt.genSalt(12);
    const hashedpass = await bcrypt.hash(password, salt);

    const date = Date.now();
    const num = "+234";

    const genNumber = Math.floor(Math.random() * 70) + date;

    const register = await UserModel.create({
      name,
      email,
      password: hashedpass,
      userName,
      PhoneNo: parseInt(num + PhoneNo),
      verified: true,
      accountNumber: genNumber,
    });

    const CreateWallet = await WalletModel.create({
      _id: register?._id,
      Balance: 1000,
      credit: 0,
      debit: 0,
    });

    register?.wallet.push(new mongoose.Types.ObjectId(CreateWallet?._id));

    res.status(200).json({
      message: "successful",
      data: register,
      token: jwt.sign({ id: register._id }, "4irlbwq9d9pkevukfbkbka"),
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occured",
      data: error,
    });
  }
};

export const MakeTransfer = async (req: Request, res: Response) => {
  try {
    const { accountNumber, amount } = req.body;
    const generatenum = Math.floor(Math.random() * 20000);

    const getUser = await UserModel.findById(req.params.Userid);
    const getReceiver = await UserModel.findOne({ accountNumber });

    const getUserWallet = await WalletModel.findById(req.params.Walletid);
    const getReceiverWallet = await WalletModel.findById(getReceiver?._id);

    if (getUser && getReceiver) {
      if (amount > getUserWallet?.Balance!) {
        return res.status(400).json({
          message: "E don red ooo",
        });
      } else {
        //updating sender wallet

        await WalletModel.findByIdAndUpdate(getUserWallet?._id, {
          Balance: getUserWallet!.Balance! - amount,
          credit: 0,
          debit: amount,
        });

        const CreditHistorySender = await HistoryModel.create({
          message: `you have sent ${amount} to ${getReceiver?.name}`,
          transactionType: "debit",
          transactionRefrence: generatenum,
        });

        getUser?.history?.push(
          new mongoose.Types.ObjectId(CreditHistorySender?._id)
        );

        //receiver info
        await WalletModel.findByIdAndUpdate(getReceiverWallet?._id, {
          Balance: getReceiverWallet!.Balance! + amount,
          credit: amount,
          debit: 0,
        });

        const CreditHistoryReceiver = await HistoryModel.create({
          message: `you have received ${amount} from ${getUser?.name}`,
          transactionType: "credit",
          transactionRefrence: generatenum,
        });

        getReceiver?.history?.push(
          new mongoose.Types.ObjectId(CreditHistoryReceiver?._id)
        );
      }
    } else {
      res.status(400).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Transaction successful",
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occured",
      data: error,
    });
  }
};

//fund your wallet

export const fundWalletFromBank = async (req: Request, res: Response) => {
  try {
    const getUser = await UserModel.findById(req.params.userId);
    const getWallet = await WalletModel.findById(req.params.walletId);

    const { amount, transactinRef } = req.body;
    await WalletModel.findByIdAndUpdate(getWallet?._id, {
      Balance: getWallet?.Balance + amount,
    });

    const createHisorySender = await HistoryModel.create({
      message: `an amount of ${amount} has been credited to your wallet`,
      transactionType: "credit",
      transactionReference: transactinRef,
    });

    getUser?.history?.push(
      new mongoose.Types.ObjectId(createHisorySender?._id)
    );

    res.status(200).json({
      message: "Wallet updated successfully",
    });
  } catch (err) {
    return res.status(404).json({
      message: "an error occurred",
      err,
    });
  }
};
