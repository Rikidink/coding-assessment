type Order = {
  orderId: string,
  customerId: string,
  item: string,
  quantity: number
};

export const fetchOrders = async () => {
  const res = await fetch('/api/orders');
  if (!res.ok) throw new Error(`Failed to load orders - ${res.status}`);
  // ! change this typing, dont nest orders
  const data: { orders: Order[] } = await res.json();
  return data;
};