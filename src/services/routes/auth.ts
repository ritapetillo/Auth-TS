import express, { Request, Response } from "express";
import { loginController, refreshToken } from "../controllers/auth.contoller";
const authRoutes = express.Router();
import { authMiddleware, isAdminMiddleware } from "../middlewares/auth";

//GET ALL USERS
authRoutes.post("/login", loginController);

//GET ALL USERS
authRoutes.post(
  "/login/admin",
  authMiddleware,
  isAdminMiddleware,
  loginController
);

//GET ALL USERS
authRoutes.post(
  "/refresh",
  refreshToken
);
export default authRoutes;
