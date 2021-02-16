import { NextFunction, Request, Response } from "express";
import User, { UserInterface } from "../../Models/User";
import atob from "atob";

interface RequestHeaderAuth {
  Authorization: String;
}

export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  console.log(req);
  const { authorization }: any = req.headers;
  if (!authorization) {
    const error: any = new Error("Please provide a basic authentication");
    error.httpStatusCode = 401;
    next(error);
  }
  const [email, password] = atob(authorization.split(" ")[1]).split(":");
  console.log(email);
  const userFound = await User.findOne({ email });
  const isValid = await userFound?.comparePassword(password);
  console.log(isValid);
  if (!isValid) {
    const error: any = new Error("Wrong credentials provided");
    error.httpStatusCode = 401;
    next(error);
  } else {
    req.user = userFound;
    next();
  }
};

export const isAdminMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) next(Error("You are not autorized"));
  if (req.user.role === "admin") next();
  else next(Error("You are not autorize"));
};
