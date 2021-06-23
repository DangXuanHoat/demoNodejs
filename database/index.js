import "reflect-metadata";
import fs from "fs";
import { ConnectionManager } from "typeorm";
import UserEntity from "./entity/UserEntity.js";
import mongoose from "mongoose";
const TAG = "Database";
export default class Database {
  constructor() {

    info(getEntitys(),"log entities")
    this.DB_TYPE = typeDB[process.env.DB_TYPE].toString() || "mysql";
    this.DB_HOST = process.env.DB_HOST || "localhost";
    this.DB_PORT = process.env.DB_PORT || 3306;
    this.DB_DATABASE = process.env.DB_DATABASE;
    this.DB_USERNAME = process.env.DB_USERNAME || "root";
    this.DB_PASSWORD = process.env.DB_PASSWORD || "";
    this.DB_CONNECT = process.env.DB_CONNECT;
    this.DB_TABLE = process.env.DB_TABLE;
  }
  async connect() {
    try {
      if (process.env.MANY_CONNECT.toLowerCase() == "true") {
      }
      switch (this.DB) {
        case typeDB.mongodb.toString():
          const uri = this.DB_CONNECT;
          if (!uri) {
            info("Lỗi kết nối cơ sở dữ liệu Mongodb!", "Database.connect");
            process.exit(1);
          }
          const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          };
          mongoose.connect(uri, options);
          let db = mongoose.connection;
          db.on("error", (err) => {
            console.log(err);
          });
          db.once("open", () => {
            console.log(
              `Open connect database ${uri} at : ${new Date(
                Date.now()
              ).toUTCString()}`
            );
          });
          break;
        default:
          try {
            this.connectionManager = new ConnectionManager();
            const conn = this.connectionManager.create({
              type: this.DB_TYPE,
              host: this.DB_HOST,
              port: 3306,
              username: this.DB_USERNAME,
              password: this.DB_PASSWORD,
              database: this.DB_DATABASE,
              entities: [await getEntitys()],
              migrationsTableName: "user",
              migrations: ["migrations/*.js"],
              cli: {
                migrationsDir: "migrations",
                entitiesDir: 'entity'
              },
              synchronize: true,
              logging: false,
            });
            await conn.connect();
            info(
              `Open connect database '${process.env.DB_USERNAME}' type '${
                process.env.DB_TYPE
              }'  at : ${new Date(Date.now()).toUTCString()}`
            );
          } catch (e) {
            error(e, "Database connect!");
          }
          break;
      }
    } catch (e) {
      error(e, TAG);
    }
  }
  migrations() {}
  getConnectionManager() {
    return this.connectionManager;
  }
}
const enumValue = (name) => Object.freeze({ toString: () => name });
const getEntitys = async () => {
  const entities = [];
  let files = fs.readdirSync("./database/entity/");
  for (var i in files) {
    try {
      entities.push(await(await import(`./entity/${files[i]}`)).default);
    } catch (e) {}
  }
  console.log(entities[0])
  return entities;
};
export const typeDB = Object.freeze({
  mysql: enumValue("mysql"),
  pg: enumValue("postgres"),
  mongodb: enumValue("mongodb"),
  mssql: enumValue("mssql"),
  oracle: enumValue("oracle"),
});
