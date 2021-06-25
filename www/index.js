import app from '../app/app.js'
import http  from 'http'
import Router from '../app/routes/router.js'
import Database from '../database/index.js'
import passport_config from '../security/module/passport.js'
import Socket from '../service/socket/socket.js'
const server = http.createServer(app)

let socket  = new Socket(server)
let router = new Router(app)
let DB = new Database()
await DB.initEntites()
await DB.connect()

passport_config(app)
await router.build(process.env.PREFIX)
await router.defaultErrorAPI()
await router.defaultErrorWeb()
await router.redirectDefault(`${process.env.PREFIX}/web/${process.env.ROUTE_DF||""}`)
socket.buildSocket()
server.listen(app.get('PORT'),()=>{
    info(`Listening in port ${app.get("PORT")}`)
    if(process.env.APP_DEBUG && process.env.APP_DEBUG.toLocaleLowerCase() == "true"){
       
    }
    
})