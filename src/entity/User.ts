import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "User"})
export class User {

    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    firstName: string = "";

    @Column()
    lastName: string = "";

}