import 'reflect-metadata'
import typeorm,{createConnection} from 'typeorm'
import mongoose from 'mongoose'

export default class Database{
    constructor(){
        this.DB_TYPE=typeDB[process.env.DB_TYPE].toString()||'mysql'
        this.DB_HOST=process.env.DB_HOST||"localhost"
        this.DB_PORT=process.env.DB_PORT || 3306
        this.DB_DATABASE=process.env.DB_DATABASE 
        this.DB_USERNAME=process.env.DB_USERNAME || 'root'
        this.DB_PASSWORD=process.env.DB_PASSWORD || ''
        this.DB_CONNECT  = process.env.DB_CONNECT 
        this.DB_TABLE  = process.env.DB_TABLE 
    }
    async connect(){
        switch(this.DB){
            case typeDB.mongodb.toString():
                const uri = this.DB_CONNECT
                if(!uri){
                    info("Lỗi kết nối cơ sở dữ liệu Mongodb!","Database.connect")
                    process.exit(1);
                }
                const options = {
                    useNewUrlParser: true,
                    useUnifiedTopology: true 
                }
                mongoose.connect(uri,options)
                let db = mongoose.connection;
                db.on('error',(err)=>{
                    console.log(err)
                })
                db.once('open',()=>{
                    console.log(`Open connect database ${uri} at : ${new Date(Date.now()).toUTCString()}`)
                })
                break
            default:
                await createConnection({
                    type: this.DB_TYPE,
                    host: this.DB_HOST,
                    port: 3306,
                    username: this.DB_USERNAME,
                    password: this.DB_PASSWORD,
                    database: this.DB_DATABASE,
                    entities: [
                        './entity/*.js'
                    ],
                    synchronize: true,
                    logging: false
                }).then(connection => {
                    info(typeDB['mysql'].toString())
                    info(`Open connect database '${process.env.DB_USERNAME}' type '${process.env.DB_TYPE}'  at : ${new Date(Date.now()).toUTCString()}`)
                }).catch(e => {
                    error(e.sqlMessage)
                    process.exit(1);
                });
                
                break
        }
    }
    seed(){

    }
    migrations(){

    }
}
const enumValue = (name) => Object.freeze({toString: () => name});

export const typeDB = Object.freeze({
    mysql: enumValue("mysql"),
    pg: enumValue("postgres"),
    mongodb: enumValue("mongodb"),
    mssql: enumValue("mssql"),
    oracle: enumValue("oracle"),
   
});