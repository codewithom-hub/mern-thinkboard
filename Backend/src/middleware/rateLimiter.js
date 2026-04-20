import ratelimit from "../config/upstash.js";

const rateLimiter = async(req,res,next)=>{
    try {
        const {success} = await ratelimit.limit("my-limit-token")
        if(!success){
            res.status(429).json({Message:"Too many request"})
        } 
        next()
    } catch (error) {
        console.log("Rate limit error",error)
        next(error)
    }
}

export default rateLimiter;