import { asc, eq, count, desc } from "drizzle-orm";
import { db } from "../db/index.js";
import { ordersTable } from "../db/schemas/orders.js";

// sortable columns on the orders table
const SORT_COLUMNS = {
  orderId: ordersTable.orderId,
  customerId: ordersTable.customerId,
  item: ordersTable.item,
  quantity: ordersTable.quantity
} as const

/**
 * Get orders with optional filtering and pagination
 * @param obj optional filtering for customerId and pagination params
 * @returns object containing orders and amount of orders
 */
export const getOrders = async ({
  customerId, page=1, pageSize=100, sortBy, sortDir
}: {
  customerId: string | undefined
  page: number | undefined
  pageSize: number | undefined
  sortBy: keyof typeof SORT_COLUMNS | undefined
  sortDir: "asc" | "desc" | undefined
}) => {
  const customerFilter = customerId 
    ? eq(ordersTable.customerId, customerId)
    : undefined;

  const sortColumn = sortBy 
    ? SORT_COLUMNS[sortBy]
    : ordersTable.orderId;

  const orderBy = sortDir === 'desc' ? desc(sortColumn) : asc(sortColumn);

  const orders = await db
    .select()
    .from(ordersTable)
    .where(customerFilter)
    .orderBy(orderBy)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const [totals] = await db
    .select({ total: count() })
    .from(ordersTable)
    .where(customerFilter);

  return { orders, total: totals?.total ?? 0 };
}

/**
 * Create an order
 * @param obj fields required to create an order
 * @returns newly created order
 */
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