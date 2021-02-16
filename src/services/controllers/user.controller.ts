import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { Error, MongooseDocument } from "mongoose";
import User, { UserInterface } from "../../Models/User";

interface RequestUser extends Request {
  user: any;
}

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (err) {
    const error: any = new Error("It was not possible to register the user");
    error.code = "404";
    console.log(err);
    next(error);
  }
};

export const getUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    res.send({ users });
  } catch (err) {
    const error: any = new Error("Users not found");
    error.code = "404";
    next(error);
  }
};

export const editController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      user: { email },
    } = req;
    let user = await User.findOne({ email });
    user = { ...user, ...req.body };
    user?.save();
    next();
  } catch (err) {
    const error: any = new Error("Users not found");
    error.code = "404";
    next(error);
  }
};
