import express from "express";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import { getAllBikes, postBike } from "./controller/bike";
import { getAllPoliceOfficers, postPoliceOfficer, resolvePoliceOfficerBike } from "./controller/policeOfficer";

// create and setup express app
const app = express();
// create database connection
createConnection();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//test routes
app.get("/bike", getAllBikes);
app.post("/bike", postBike);

app.get("/policeOfficer", getAllPoliceOfficers);
app.post("/policeOfficer", postPoliceOfficer);
app.put("/policeOfficer/resolve", resolvePoliceOfficerBike);

// start express server
app.listen(3000);

