import express from "express";
const routers = express.Router();
import passport from "passport";
import * as passportMiddleware from "../../../security/middleware/passportMiddleware.js";
import * as authcontroller from "../../controller/AuthController.js";
import User from "../../../database/model/User.js";
 
routers.get("/", (req, res) => {
  return res.render("page/auth", {
    layout: "layouts/default",
    title: "Đăng nhập",
  });
});
routers.post("/",passportMiddleware.checkPassport,passport.authenticate('local',{
  failureFlash:true,
  successRedirect:`${process.env.PREFIX||''}/web/dashboard`,
  successFlash:"success login!",
  failureMessage:"failure",
  failureRedirect:`${process.env.PREFIX||''}/web/auth`
}));
routers.post("/register", authcontroller.create);
routers.put("/user/update", authcontroller.update);
routers.delete("/user/:id", authcontroller.detroy);
// routers.get('/admin',(req,res)=>{
//    const connection = dbConnect.manager
//    console.log(connection.getRepository("User"))
//    let user =  new User()
//    user.email = "danghoat@gmail.com"
//    user.password = "123123123"

//    let responsitory =  connection.getRepository("User")
//    responsitory.save(user)
//    .then((saved)=>{
//       error(saved)
//       return responsitory.find()
//    }).then((all)=>{
//       error(all)
//    })
//    return res.render("page/auth",{
//    layout:"layouts/default",
//     title:"BlueDragon Admin"
//    })
// })
export default routers;
