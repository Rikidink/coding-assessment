import { db } from "../db/index.js";
import { ordersTable } from "../db/schemas/orders.js";

export const getOrders = async () => {
  const orders = await db
    .select()
    .from(ordersTable)

  return orders;
}

export const createOrder = async ({
  orderId,
  customerId,
  item,
  quantity
}: {
  orderId: string,
  customerId: string,
  item: string,
  quantity: number
}) => {
  const order = await db
    .insert(ordersTable)
    .values({
      orderId,
      customerId,
      item,
      quantity
    })
    .returning()

  return order[0]
}