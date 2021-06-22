import express from 'express'
const routers = express.Router()
routers.get('/',(req,res)=>{
   return res.render("page/auth",{
   layout:"layouts/default",
    title:"Đăng nhập"
   })
})
routers.get('/admin',(req,res)=>{
   return res.render("page/auth",{
   layout:"layouts/default",
    title:"BlueDragon Admin"
   })
})
export default routers