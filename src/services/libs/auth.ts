import redis  from 'redis'
import JWTR from 'jwt-redis'
import { networkInterfaces } from 'os'
const redisClient = redis.createClient()
export const jwtr = new JWTR(redisClient)


export const generateToken = async (user : {})=>{

try{

    const token = await jwtr.sign(user,process.env.AUTH_TOKEN_SECRET,{expiresIn:process.env.AUTH_TOKEN_DURATION})
    if(token) return token


}catch(err){
   return null
}
}
export const generateRefreshToken = async (user: {})=>{

    try{
    
        const token = await jwtr.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1hr'})
        if(token) return token
    
    
    }catch(err){
       return null
    }
    }

export const verifyToken = async (token : string)=>{
try{
const decoded = await jwtr.verify(token,process.env.AUTH_TOKEN_SECRET)
if(decoded) return decoded
else return null
}catch(err){
    console.log(err)
return null
}
}

export const verifyRefreshToken = async (token : any)=>{
    try{
        const refreshToken = token.split(" ")[1]
console.log(refreshToken)
    const decoded = await jwtr.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
    console.log
    if(decoded) {
        console.log(decoded)
        const jti = decoded.jti
       // @ts-ignore
        const expired = await jwtr.destroy(jti)
        console.log(expired)
        return decoded}
    else {
        await jwtr.destroy(token)
        return null}
    }catch(err){
        console.log(err)
    return null
    }
    }