import express from 'express'
const routers = express.Router()
const dbConnect = DB.getConnectionManager().get()
import User from '../../../database/model/User.js'

routers.get('/',(req,res)=>{
  
   return res.render("page/auth",{
   layout:"layouts/default",
    title:"Đăng nhập"
   })
})
routers.get('/admin',(req,res)=>{
   const connection = dbConnect.manager
   console.log(connection.getRepository("User"))
   let user =  new User()
   user.email = "danghoat@gmail.com"
   user.password = "123123123"
   
   let responsitory =  connection.getRepository("User")
   responsitory.save(user)
   .then((saved)=>{
      error(saved)
      return responsitory.find()
   }).then((all)=>{
      error(all)
   })
   return res.render("page/auth",{
   layout:"layouts/default",
    title:"BlueDragon Admin"
   })
})
export default routers