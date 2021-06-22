import {MigrationInterface, QueryRunner} from "typeorm"; 
export class User{
    constructor(){
        this.queryRunner = QueryRunner
    }
    async up(){

    }
    async down(){
        await this.queryRunner.query(`ALTER TABLE book drop column price`)
    }

}