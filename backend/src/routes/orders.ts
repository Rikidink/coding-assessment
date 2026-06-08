import { Router } from "express";
import { z } from "zod";
import { getCustomer } from "../services/customers.js";
import { createOrder, getOrders } from "../services/orders.js";

export const ordersRouter = Router();

// * GET: get orders
ordersRouter.get('/', async (_, res) => {
  const orders = await getOrders();

  return res.status(200).json({ orders });
});

// * POST: create order
const createOrderSchema = z.object({
  body: z.object({
    orderId: z.string(),
    customerId: z.string(),
    item: z.string(),
    quantity: z.int().positive()
  })
})

ordersRouter.post('/', async (req, res) => {
  const validatedReq = createOrderSchema.safeParse(req);

  if (!validatedReq.success) {
    return res.status(400).json({ error: "invalid request" });
  };

  const validatedBody = validatedReq.data.body;

  const customer = await getCustomer(validatedBody.customerId);

  if (!customer) {
    return res.status(404).json({ error: "customer not found" });
  };

  const newOrder = await createOrder(validatedBody);

  return res.status(201).json({ newOrder });
});