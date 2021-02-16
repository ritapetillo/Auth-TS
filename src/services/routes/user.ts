import express, { NextFunction, Response } from "express";
import {
  editController,
  getUsersController,
  registerController,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth";
const userRoutes = express.Router();

//GET ALL USERS
userRoutes.get("/", getUsersController);

//REGISTER A USER
userRoutes.post("/", registerController);

// EDIT A USER
userRoutes.put("/edit", editController);

//GET CURRENT USER PROFILE
userRoutes.get(
  "/me",
  authMiddleware,
  (req: any, res: Response, next: NextFunction) => res.send(req.user)
);

export default userRoutes;
