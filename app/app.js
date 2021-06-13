import express from 'express'
import dotenv from 'dotenv'
import express_ejs_layouts from 'express-ejs-layouts'
import path from 'path'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import logconfig from '../logs/config.js'

dotenv.config()
global._dirpath = path.resolve()
const app = express()
logconfig(app)

app.set("PORT",process.env.APP_PORT||3000)

app.set('view engine', 'ejs');
app.set('views', _dirpath+ '/src/templates')

app.use(express_ejs_layouts)
app.set('layout', 'layouts/default');

app.use(express.static('src/public'))
app.use('/css',express.static(_dirpath+'/css'))
app.use('/js',express.static(_dirpath+'/js'))
app.use('/assets',express.static(_dirpath+'/assets'))
app.use('/libs',express.static(_dirpath+'/libs'))
app.use('/uploads', express.static(process.env.PATHFILE));
//config request
app.use(express.json())
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// for parsing multipart/form-data

app.use(cookieParser())
app.use(session({
    resave:true,
    secret:"WG9hbiBEdXnDqm4gVHLDoE15",
    saveUninitialized:true,
    cookie:{
        maxAge:60000
    }
}))


export default app 

