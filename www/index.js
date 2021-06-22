import app from '../app/app.js'
import Router from '../app/routes/router.js'

import Database from '../model/index.js'
import passport_config from '../security/module/passport.js'

passport_config(app)
let router = new Router(app)
let db = new Database()
await db.connect()
await router.build(process.env.PREFIX)
await router.defaultErrorAPI()
await router.defaultErrorWeb()
await router.redirectDefault(`${process.env.PREFIX}/web/${process.env.ROUTE_DF||""}`)
info(router.listRoute,"list Route")
app.listen(app.get('PORT'),()=>{
    info(`Listening in port ${app.get("PORT")}`)
})