import express from 'express'
const routers = express.Router()
routers.get('/auth',(req,res)=>{
   return res.render("page/home",{
    layout:"layouts/dashboard"
   })
})
export default routers