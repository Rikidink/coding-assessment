import express from "express"
import { ordersRouter } from "./routes/orders.js";
import { Router } from "express";

export const app = express();

app.use(express.json());

const apiRouter = Router();
apiRouter.use('/orders', ordersRouter)

app.use('/api', apiRouter);