import { z } from "zod";

/**
 * Zod object representing query params for getting orders
 * Includes pagination
 */
export const getOrdersQuerySchema = z.object({
  customerId: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce.number().int().positive().optional()
});

/**
 * Zod object representing JSON body for creating an order
 */
export const createOrderSchema = z.object({
  orderId: z.string(),
  customerId: z.string(),
  item: z.string(),
  quantity: z.int().positive()
})