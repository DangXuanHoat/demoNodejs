import jwt from 'jsonwebtoken'
const secretSignature = process.env.KEY_JWT || ""
const tokenLife = process.env.LIFETOKEN || 3600
export function createJwt(data){
    return new Promise((resolve,reject)=>{
        jwt.sign(
            {data: data},
            secretSignature,
            {
                algorithm:'HS256',
                expiresIn:Number(tokenLife)
            },(error,token)=>{
                if(error) return reject(error)
                return resolve(token)
            }
        )
    })
}
export function verifyToken (token,secretSignature){
    return new Promise((resolve,reject)=>{
        jwt.decode(token,secretSignature,(err,decoded)=>{
            if(err) return reject(err)
            return resolve(decoded) 
        }) 
    })
}