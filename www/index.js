import app from '../app/app.js'
import Router from '../app/routes/router.js'
import routers from '../app/routes/web/auth.route.js'
import passport_config from '../security/module/passport.js'

passport_config(app)
let router = new Router(app)
await router.build(process.env.PREFIX)
await router.redirectDefault('/hoatdx/web')
await router.defaultErrorAPI()
await router.defaultErrorWeb()

app.listen(app.get('PORT'),()=>{
    info(`Listening in port ${app.get("PORT")}`)
})