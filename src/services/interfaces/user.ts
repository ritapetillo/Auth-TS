import mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
    email?: string;
    password: string;
    name?: string;
    lastName?: string;
    comparePassword(password: string): boolean;
  }

  export interface Idecoded {
      email?:string,
      id?:string,
  jti?: string,
  iat?: number
  exp?:number

  }
 