import { config } from "dotenv";
import express from "express";
import UserController from "./controllers/UserController";

config();

const app = express();

app.use(express.json());

app.use("/users", UserController);

export default app;