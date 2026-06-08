import { asc, eq, count } from "drizzle-orm";
import { db } from "../db/index.js";
import { ordersTable } from "../db/schemas/orders.js";

export const getOrders = async ({
  customerId,
  page,
  pageSize
}: {
  customerId: string | undefined
  page: number | undefined
  pageSize: number | undefined
}) => {
  const customerFilter = customerId 
    ? eq(ordersTable.customerId, customerId)
    : undefined;

  const pageSizeNum = pageSize ?? 100;
  const pageNum = page ?? 1;

  const orders = await db
    .select()
    .from(ordersTable)
    .where(customerFilter)
    .orderBy(asc(ordersTable.orderId))
    .limit(pageSizeNum)
    .offset((pageNum - 1) * pageSizeNum);

  const [totals] = await db
    .select({ total: count() })
    .from(ordersTable)
    .where(customerFilter);

  return { orders, total: totals?.total ?? 0 };
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