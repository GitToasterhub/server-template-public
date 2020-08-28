import { Request, Response } from "express";
import { findAllBikes, findBikeById, createBike } from "../service/bike";

export async function getAllBikes(_req: Request, res: Response) {
    const bikes = await findAllBikes();
    res.json(bikes);
}

export async function getBikeById(req: Request, res: Response) {
    const id = req.body.id;
    const bike = await findBikeById(id);
    res.json(bike);
}

export async function postBike(req: Request, res: Response) {
    res.json(await createBike(req.body));
}