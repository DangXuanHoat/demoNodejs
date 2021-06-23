import morgan from 'morgan'
import {debug,error,warn,info,write} from './log.js'
const logconfig  =(app)=>{
    global.error = error.bind(this)
    global.warn = warn.bind(this)
    global.info = info.bind(this)
    global.debug = debug.bind(this)
    if(process.env.APP_DEBUG && process.env.APP_DEBUG.toLocaleLowerCase() == "true"){
        app.use(morgan('dev'))
    }
    //
}
export default logconfig