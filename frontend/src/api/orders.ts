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
export const fetchOrders = async ({ page, pageSize }: { page: number; pageSize: number }) => {
  const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
  const res = await fetch(`/api/orders?${params}`);

  if (!res.ok) throw new Error(`Failed to load orders - ${res.status}`);
  
  const data: { orders: Order[], total: number } = await res.json();
  return data;
};