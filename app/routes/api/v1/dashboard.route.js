import express from 'express'
const routers = express.Router()
routers.get('/',(req,res)=>{
    return res.status(200).json({
        message:"Success"
    })
})
export default routers