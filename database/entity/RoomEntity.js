import {EntitySchema } from "typeorm"; 
import Room from "../model/Room.js";
export default new EntitySchema({
    name:"Room",
    target : Room,
    columns:{
        id: {
            primary: true,
            type: "int",
            generated: true
        },name :{
            type : 'varchar'
        }
    }
})
