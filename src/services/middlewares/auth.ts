import { NextFunction, Request, Response } from "express";
import User, { UserInterface } from "../../Models/User";
import atob from "atob";
import { verifyToken } from "../libs/auth";
import { error } from "console";
import { Idecoded } from "../interfaces/user";

interface RequestHeaderAuth {
  Authorization: String;
}

export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
 try { 
  const { authorization }: any = req.headers;
  if (!authorization) {
    const error: any = new Error("Please provide a basic authentication");
    error.httpStatusCode = 401;
    next(error);
  }
  const token = authorization.split(" ")[1]
  const decoded : Idecoded | null | undefined = await verifyToken(token)
  if(!decoded) throw error
  const user = await User.findById(decoded.id)
  req.user = user
  next()
  console.log(decoded)} catch(err){
    const error:any = new Error('You are not authorized');
    error.code(404)
    next(error)
    
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
