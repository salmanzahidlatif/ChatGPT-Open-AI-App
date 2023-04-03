import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

app.use(cors());
app.use(express.json());

export const app = express();
