import { describe, it, expect } from "vitest";
import { createOrderSchema, getOrdersQuerySchema } from "./orders.js";

/**
 * createOrderSchema test for POST api/orders
 */
describe("createOrderSchema", () => {
  const validOrder = {
    orderId: "ORD-1001",
    customerId: "CUST-1",
    item: "Laptop",
    quantity: 2,
  };

  it("accepts a fully valid order", () => {
    expect(createOrderSchema.safeParse(validOrder).success).toBe(true);
  });

  it.each(["orderId", "customerId", "item", "quantity"] as const)(
    "rejects when the required field '%s' is missing",
    (field) => {
      const partial: Record<string, unknown> = { ...validOrder };
      delete partial[field];
      expect(createOrderSchema.safeParse(partial).success).toBe(false);
    }
  );

  it("rejects a zero quantity (must be positive)", () => {
    expect(createOrderSchema.safeParse({ ...validOrder, quantity: 0 }).success).toBe(false);
  });

  it("rejects a negative quantity", () => {
    expect(createOrderSchema.safeParse({ ...validOrder, quantity: -3 }).success).toBe(false);
  });

  it("rejects a non-integer quantity", () => {
    expect(createOrderSchema.safeParse({ ...validOrder, quantity: 1.5 }).success).toBe(false);
  });

  it("rejects a non-numeric quantity (request bodies are not coerced)", () => {
    expect(createOrderSchema.safeParse({ ...validOrder, quantity: "2" }).success).toBe(false);
  });
});

/**
 * getOrdersQuerySchema for GET api/orders
 */
describe("getOrdersQuerySchema", () => {
  it("accepts an empty query: every param is optional", () => {
    expect(getOrdersQuerySchema.safeParse({}).success).toBe(true);
  });

  it("coerces page and pageSize from query strings to numbers", () => {
    const result = getOrdersQuerySchema.safeParse({ page: "2", pageSize: "5" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(2);
      expect(result.data.pageSize).toBe(5);
    }
  });

  it("rejects a non-positive page", () => {
    expect(getOrdersQuerySchema.safeParse({ page: "0" }).success).toBe(false);
  });

  it("rejects a non-numeric page", () => {
    expect(getOrdersQuerySchema.safeParse({ page: "abc" }).success).toBe(false);
  });

  it("accepts a whitelisted sortBy column", () => {
    expect(getOrdersQuerySchema.safeParse({ sortBy: "quantity" }).success).toBe(true);
  });

  it("rejects a sortBy outside the whitelist", () => {
    expect(getOrdersQuerySchema.safeParse({ sortBy: "password" }).success).toBe(false);
  });

  it("rejects an invalid sortDir", () => {
    expect(getOrdersQuerySchema.safeParse({ sortDir: "up" }).success).toBe(false);
  });
});
