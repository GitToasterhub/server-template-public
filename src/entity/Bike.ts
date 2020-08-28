import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

export enum BikeStatus {
    FOUND = "FOUND",
    SEARCH = "SEARCH",
    MISSING = "MISSING",
}

@Entity({name: "Bike"})
export class Bike {

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    status: BikeStatus = BikeStatus.MISSING;

    @Column()
    owner: string = "";

    @Column()
    description: string = "";

}