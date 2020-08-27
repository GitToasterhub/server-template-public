import express from "express";
import bodyParser from "body-parser";
import {Request, Response} from "express";
import {createConnection, getRepository} from "typeorm";
import {User} from "./entity/User";
import {Bike} from "./entity/Bike";
import {PoliceOfficer} from "./entity/PoliceOfficer";

// create database connection
createConnection();

// create and setup express app
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//test routes
app.get("/bike", async function(_req: Request, res: Response) {
    const bikes = await getRepository(Bike).find();
    res.json(bikes);
});

app.get("/policeOfficer", async function(_req: Request, res: Response) {
    const policeOfficers = await getRepository(PoliceOfficer).find();
    res.json(policeOfficers);
});

app.get("/users", async function(_req: Request, res: Response) {
    const users = await getRepository(User).find();
    res.json(users);
});

app.post("/users", function(req: Request, res: Response) {
    console.log(req.body);
    const users = getRepository(User);
    const user = new User();
    users.save(user);
    res.send(req.body);
});

// start express server
app.listen(3000);

