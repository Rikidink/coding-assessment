import express from "express"
import { ordersRouter } from "./routes/orders.js";

export const app = express();

app.use(express.json());

app.use('/api/orders', ordersRouter);