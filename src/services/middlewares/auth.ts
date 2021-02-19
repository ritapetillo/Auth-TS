import { NextFunction, Request, Response } from "express";
import User, { UserInterface } from "../../Models/User";
import atob from "atob";
import { verifyToken } from "../libs/auth";
import { error } from "console";
import { Idecoded } from "../interfaces/user";



export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
 try { 
  const {authToken} = req.cookies;
  console.log(authToken)
  
  if (!authToken) {
    const error: any = new Error("Please provide a basic authentication");
    error.httpStatusCode = 401;
    next(error);
  }
  const decoded : Idecoded | null | undefined = await verifyToken(authToken)
  if(!decoded) throw error
  const user = await User.findById(decoded.id)
  req.user = user
  next()
  console.log(decoded)} catch(err){
    const error:any = new Error('You are not authorized');
    error.httpStatusCode = 401;
    console.log(err)
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

export const generateCookies = async (
  req: any,
  res: Response,
  next: NextFunction
)  =>{
  console.log(req.user)
  res.cookie('authToken',req.user.tokens.authToken,{httpOnly:true})
  res.cookie('refreshToken',req.user.tokens.refreshToken,{httpOnly:true})
  next()

}