import express from "express";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
