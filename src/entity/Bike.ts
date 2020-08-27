import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "Bike"})
export class Bike {

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    isResolved: boolean = false;

    @Column()
    owner: string = "";

}