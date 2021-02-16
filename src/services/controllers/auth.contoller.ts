import { NextFunction, Request, Response } from "express";
import User, { UserInterface } from "../../Models/User";

interface RequestUser extends Request {
  user: any;
}

export const loginController = async (
  req: RequestUser,
  res: any,
  next: any
) => {
  const user = req.user;
  res.send(user);
};
