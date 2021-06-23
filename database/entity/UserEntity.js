import {EntitySchema } from "typeorm"; 
import User from '../model/User.js'
export default new EntitySchema({
    name: "User",
    target: User,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        email: {
            type: "varchar"
        },
        password:{
            type: "varchar"
        },
        permissions: {
            type: "varchar"
        },
        last_login:{
            type: "timestamp"
        },
        gender: {
            type: "varchar"
        },
        birthday:{
            type: "varchar"
        },
        first_name: {
            type: "varchar"
        },
        last_name:{
            type: "varchar"
        },
        is_active: {
            type: "boolean"
        },
        is_reported:{
            type: "boolean"
        },
        is_blocked: {
            type: "boolean"
        },
        preferences:{
            type: "varchar"
        }
        
    }
})
