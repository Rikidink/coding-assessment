type Order = {
  orderId: string,
  customerId: string,
  item: string,
  quantity: number
};

/**
 * Fetch orders from API
 * @param obj page and pageSize for pagination
 * @returns data fetched from /api/orders endpoint
 */
export const fetchOrders = async ({
  page, pageSize, sortBy, sortDir,
}: {
  page: number; pageSize: number;
  sortBy?: string; sortDir?: "asc" | "desc";
}) => {
  const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
  if (sortBy) params.set("sortBy", sortBy);
  if (sortDir) params.set("sortDir", sortDir);

  const res = await fetch(`/api/orders?${params}`);
  if (!res.ok) throw new Error(`Failed to load orders - ${res.status}`);
  
  const data: { orders: Order[], total: number } = await res.json();
  return data;
};