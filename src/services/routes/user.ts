import express from "express";
import {
  editController,
  getUsersController,
  registerController,
} from "../controllers/user.controller";
const userRoutes = express.Router();

//GET ALL USERS
userRoutes.get("/", getUsersController);

//REGISTER A USER
userRoutes.post("/", registerController);

// //REGISTER A USER
userRoutes.put("/edit", editController);

export default userRoutes;
