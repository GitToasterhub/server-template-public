import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import { Bike } from "./Bike";

@Entity({name: "PoliceOfficer"})
export class PoliceOfficer {

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    name: string = "";

    @Column()
    surname: string = "";

    @Column()
    isAvailable: boolean = true;

    @OneToOne(_type => Bike)
    @JoinColumn()
    bike: Bike | undefined;

}