import { Request, Response } from "express";
import Investmodel from "../Model/Investmodel";
import UserModel from "../Model/User.model";
import WalletModel from "../Model/Wallet.model";

export const CreateInvestify = async (req: Request, res: Response) => {
  try {
    const getUser = await UserModel.findById(req.params.id);
    const getWallet = await WalletModel.findById(getUser?._id);

    if (getUser?.isAdmin === true) {
      const { title, description, category, duration, amountPerUnit } =
        req.body;
      const creating = await Investmodel.create({
        title,
        description,
        category,
        duration,
        amountPerUnit,
      });

      return res.status(200).json(creating);
    } else {
      return res.status(400).json({
        message: "UnAuthorized user",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "An error occured",
    });
  }
};
