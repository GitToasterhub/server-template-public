import { Request, Response } from "express";
import { findAllpoliceOfficers, createPoliceOfficer, policeOfficerResolveBike } from "../service/policeOfficer";

export async function getAllPoliceOfficers(_req: Request, res: Response) {
    const policeOfficers = await findAllpoliceOfficers();
    res.json(policeOfficers);
}

export async function postPoliceOfficer(req: Request, res: Response) {
    res.json(await createPoliceOfficer(req.body));
}

export async function resolvePoliceOfficerBike(req: Request, res: Response) {
    res.json(await policeOfficerResolveBike(req.body.id));
}