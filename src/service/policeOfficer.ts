import { getRepository } from "typeorm";
import { PoliceOfficer } from "../entity/PoliceOfficer";
import { EventEmitter } from "events";
import { Bike, BikeStatus } from "../entity/Bike";
import { updateBikeStatus, findMissingBike } from "./bike";

const policeOfficerEventEmitter = new EventEmitter();

export enum PoliceOfficerEvents {
    RESOLVED = "RESOLVED"
}

export function findAllpoliceOfficers(){
    return getRepository(PoliceOfficer).find();
}

export function findPoliceOfficerById(id: number){
    return getRepository(PoliceOfficer).findOne({id});
}

export function findAvailablePoliceOfficer(){
    return getRepository(PoliceOfficer).findOne({isAvailable: true});
}

export function setPoliceOfficerBike(id: number, bike: Bike){
    return getRepository(PoliceOfficer).update(id, {
        bike, 
        isAvailable:false,
    });
}

export function createPoliceOfficer(policeOfficerData: { 
    name: string, 
    surname: string,
}){
    const policeOfficer =  new PoliceOfficer();
    policeOfficer.name = policeOfficerData.name;
    policeOfficer.surname = policeOfficerData.surname;
    return getRepository(PoliceOfficer).save(policeOfficer);
}

export async function policeOfficerResolveBike(id: number){
    const policeOfficer = (await findPoliceOfficerById(id)) as PoliceOfficer;
    policeOfficer.isAvailable = true;
    policeOfficerEventEmitter.emit(PoliceOfficerEvents.RESOLVED, policeOfficer);
    return getRepository(PoliceOfficer).save(policeOfficer);
}

policeOfficerEventEmitter.on(PoliceOfficerEvents.RESOLVED, async (policeOfficer: PoliceOfficer) => {
    const bike = policeOfficer.bike as Bike;
    await updateBikeStatus(bike.id as number, BikeStatus.FOUND);
    const missingBike = await findMissingBike();
    if(missingBike){
        await setPoliceOfficerBike(policeOfficer.id as number, bike);
        await updateBikeStatus(missingBike.id as number, BikeStatus.SEARCH);
    }
});