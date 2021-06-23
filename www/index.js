import app from '../app/app.js'
import http  from 'http'
import Router from '../app/routes/router.js'
import Database from '../database/index.js'
import passport_config from '../security/module/passport.js'
const server = http.createServer(app)
passport_config(app)
let router = new Router(app)
global.DB = new Database()
await DB.connect()
await router.build(process.env.PREFIX)
await router.defaultErrorAPI()
await router.defaultErrorWeb()
await router.redirectDefault(`${process.env.PREFIX}/web/${process.env.ROUTE_DF||""}`)
info(router.listRoute,"list Route")

server.listen(app.get('PORT'),()=>{
    info(`Listening in port ${app.get("PORT")}`)
    
})