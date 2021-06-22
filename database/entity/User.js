import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"; 
@Entity()
export default class User{
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    email : string

    @Column()
    password: string

    @Column()
    permissions : string

    @Column({type:'timestamptz'})
    last_login : Date

    @Column()
    first_name: string

    @Column()
    last_name : string
    
    @Column()
    gender : string

    @Column({type:'timestamptz'})
    birthday : Date
    @Column()
    is_active: boolean
    @Column() 
    is_reported : boolean

    @Column()
    is_blocked : boolean

    @Column()
    preferences : string

    @Column({type:'timestamptz'})
    created_at : Date

    @Column({type:'timestamptz'})
    updated_at:   Date


}