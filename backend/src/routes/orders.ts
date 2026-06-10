import { Router } from "express";
import { getCustomer } from "../services/customers.js";
import { createOrder, getOrders } from "../services/orders.js";
import { getOrdersQuerySchema, createOrderSchema } from "../zodSchemas/orders.js";

export const ordersRouter = Router();

// * GET: get orders
ordersRouter.get('/', async (req, res) => {
  const parsed = getOrdersQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).json({ error: "invalid query" });
  };

  const orders = await getOrders({
    customerId: parsed.data.customerId,
    page: parsed.data.page,
    pageSize: parsed.data.pageSize,
    sortBy: parsed.data.sortBy,
    sortDir: parsed.data.sortDir
  });

  return res.status(200).json({ orders: orders.orders, total: orders.total });
});


// * POST: create order
ordersRouter.post('/', async (req, res) => {
  const parsed = createOrderSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: "invalid request" });
  };

  const validBody = parsed.data;

  const customer = await getCustomer(validBody.customerId);

  if (!customer) {
    return res.status(404).json({ error: "customer not found" });
  };

  const newOrder = await createOrder(validBody);

  if (!newOrder) {
    return res.status(409).json({ error: "order already exists" });
  };

  return res.status(201).json({ ...newOrder });
});