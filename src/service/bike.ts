import { getRepository } from "typeorm";
import { Bike, BikeStatus } from "../entity/Bike";
import { EventEmitter } from "events";
import { findAvailablePoliceOfficer, setPoliceOfficerBike } from "./policeOfficer";

const bikesEventEmitter = new EventEmitter();

export enum BikeEvents {
    CREATED = "CREATED"
}

export function findAllBikes(){
    return getRepository(Bike).find();
}

export function findBikeById(id: number){
    return getRepository(Bike).findOne({id});
}

export function findMissingBike(){
    return getRepository(Bike).findOne({status: BikeStatus.MISSING});
}

export async function createBike(bikeData: { 
    owner: string,
    description: string,
}){
    const bike =  new Bike();
    bike.owner = bikeData.owner;
    bike.description = bikeData.description;
    const saved = await getRepository(Bike).save(bike);
    bikesEventEmitter.emit(BikeEvents.CREATED, saved); // emit this event to find available police and assign
    return saved;
}

export function updateBikeStatus(id: number, status: BikeStatus){
    return getRepository(Bike).update(id, {status});
}

bikesEventEmitter.on(BikeEvents.CREATED, async (bike) => { // Let's find available police, if there is - then assign and update status to search
    const availablePoliceOfficer = await findAvailablePoliceOfficer();
    if(availablePoliceOfficer) {
        await updateBikeStatus(bike.id as number, BikeStatus.SEARCH);
        await setPoliceOfficerBike(availablePoliceOfficer.id as number, bike);
    }
})