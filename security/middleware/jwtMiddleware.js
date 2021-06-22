import jwt from '../module/jwt.js'
const accessTokenSecret  = process.env.KEY_JWT ||"eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmQifQ"
async function  isAuth(request, response,next){
    const token = request.body.token || request.query.token || request.headers['x-access-token']
    if(token){
        try {
            const decoded  = await jwt.verifyToken(token,accessTokenSecret)
            request.jwtDecoded = decoded
            next() 
        } catch (err) {
            return response.status(401).json({
                message:"Unauthorized"
            })
        }
    }else{
        return response.status(403).json({
            message:"No token!!!"
        })
    }

}
async function  destroy(request, response){
    
}