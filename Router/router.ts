import { Router } from "express";
import {
  ClaimDailyInterest,
  CreateQuickSave,
} from "../Controllers/QuickSaveController";
import { CreateTarget } from "../Controllers/TargetControllers";
import { MakeTransfer, RegisterUser } from "../Controllers/User.controllers";

const router = Router();

router.route("/register").post(RegisterUser);
router.route("/sendmoney/:Userid/:Walletid").post(MakeTransfer);
router.route("/target/:id").post(CreateTarget);
router.route("/claim/:SaveId").post(ClaimDailyInterest);
router.route("/save/walletId").post(CreateQuickSave);

export default router;
