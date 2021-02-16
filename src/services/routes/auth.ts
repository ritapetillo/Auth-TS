import express, { Request, Response } from "express";
import { loginController } from "../controllers/auth.contoller";
const authRoutes = express.Router();
import { authMiddleware, isAdminMiddleware } from "../middlewares/auth";

//GET ALL USERS
authRoutes.post("/login", authMiddleware, loginController);

//GET ALL USERS
authRoutes.post(
  "/login/admin",
  authMiddleware,
  isAdminMiddleware,
  loginController
);

export default authRoutes;
