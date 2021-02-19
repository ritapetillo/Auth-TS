import express, { Request, Response } from "express";
import { googleAuth, loginController, logout, refreshToken } from "../controllers/auth.contoller";
const authRoutes = express.Router();
import { authMiddleware, generateCookies, isAdminMiddleware } from "../middlewares/auth";
import passport from 'passport'

//LOGIN
authRoutes.post("/login", loginController);

//LOGIN GOOGLE
authRoutes.get("/google", passport.authenticate('google', { scope: ['profile','email'] }));

//LOGIN GOOGLE
authRoutes.get("/google/callback", passport.authenticate('google', { failureRedirect: '/login' }),generateCookies,googleAuth);

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

//GET ALL USERS
authRoutes.post(
  "/logout",
  logout
);



export default authRoutes;
