import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import User from '../../Models/User'
import { IUser } from '../interfaces/user';
import { generateAllTokens } from './auth';
 

passport.use("google",new GoogleStrategy ({
    clientID: process.env.GOOGLE_CLIENT!,
    clientSecret: process.env.GOOGLE_SECRET!,
    callbackURL: "http://localhost:3002/api/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    try{
      const {email,given_name,family_name,picture} = profile. _json
      //verify if the user is already registered
      const user =  await User.findOne({email})
      if(!user){
        //register the user
        const newUser : IUser = new User({
          name:given_name,
          lastName:family_name,
          picture:picture,
          email,
          role:'user',
          googleId:profile.id


        })
        const savedUser : IUser = await newUser.save()
        const {_id} = savedUser
        const tokens = await generateAllTokens({email,id:_id})
        done(undefined,{user:savedUser,tokens})

      } else{
        const { _id} = user
        //generate token
        const tokens = await generateAllTokens({email,id:_id})
        done(undefined,{user,tokens})


      }
    }catch(err){
      done(err,undefined)

    }

    console.log(profile)
  }
));

passport.serializeUser(function(user,done){done(null,user)})