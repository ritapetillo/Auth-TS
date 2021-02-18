import { error } from "console";
import { NextFunction, Request, Response } from "express";
import { IncomingHttpHeaders } from "http";
import User, { UserInterface } from "../../Models/User";
import { Idecoded } from "../interfaces/user";
import { generateRefreshToken, generateToken, verifyRefreshToken, verifyToken } from "../libs/auth";

interface RequestUser extends Request {
  user: any;
}

export const loginController = async (
  req: RequestUser,
  res: any,
  next: any
) => {
  try
 { //verify credentials 
  const {email,password} = req.body
  const user = await User.findOne({email})
  const validPass = await user?.comparePassword(password)
  //if credentials are good, generate token
  console.log(validPass)
  if (!validPass) throw error
  const authToken = await generateToken({email,id:user?._id})
  const refreshToken = await generateRefreshToken({email,id:user?._id})
  res.send({authToken,refreshToken})


}catch(err){
   next(err)
  }

};

export const refreshToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try
 { //verify credentials 
  const {refreshtoken} : IncomingHttpHeaders = req.headers
  console.log(refreshtoken)
  const decode = await verifyRefreshToken(refreshtoken)
  console.log(decode)
 if(!decode) throw error
 const user : Idecoded = decode
 const {email, id} = user
 const authToken = await generateToken({email,id})
 const refreshToken = await generateRefreshToken({email,id})
 res.send({authToken,refreshToken})

}catch(err){
   next(err)
  }

};

