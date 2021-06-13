import express from 'express'
const routers = express.Router()
routers.get('/landing-page',(req,res)=>{
   return res.render("page/home",{
      layout:"layouts/landing-page"
     })
})
export default routers