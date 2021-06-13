import nodemailer from 'nodemailer'
const user = process.env.MAIL_USERNAME 
const pass = process.env.MAIL_PASSWORD
const host = process.env.MAIL_PASSWORD
const port = process.env.MAIL_PASSWORD

export const sendMainByNodeMailer = (data)=>{
  
    let transport = nodemailer.createTransport({
        host: host,
        port: port,
        auth: {
           user: user,
           pass: pass
        }
    });
    transport.sendMail(data, function(err, info) {
        if (err) {
            return {
                message : "Fail",
                result : err
              }
        } else {
          return {
            message : "Success",
            result : info
          }
        }
    });
}