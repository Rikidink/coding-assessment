import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { customersTable } from "../db/schemas/customers.js";

export const getCustomer = async (custId: string) => {
  const cust = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.customerId, custId));

  if (cust.length === 0) return null;

  return cust[0]
};

export const createCustomer = async ({
  customerId,
  firstName,
  lastName,
}: {
  customerId: string;
  firstName: string;
  lastName: string;
}) => {
  const customer = await db
    .insert(customersTable)
    .values({
      customerId,
      firstName,
      lastName
    })
    .returning()

  return customer[0]
};