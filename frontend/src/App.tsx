import { useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { fetchOrders } from "./api/orders"

const PAGE_SIZE = 5

function App() {
  const [page, setPage] = useState(1)

  const { data, isPending, isError, error, isPlaceholderData } = useQuery({
    queryKey: ['orders', page],
    queryFn: () => fetchOrders({ page, pageSize: PAGE_SIZE }),
    placeholderData: keepPreviousData,
  });

  if (isPending) return <p className="p-6 text-gray-500">Loading orders...</p>;
  if (isError) return <p className="p-6 text-red-600">Error: {error.message}</p>;

  const totalPages = Math.max(1, Math.ceil(data.total / PAGE_SIZE));

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900">Orders</h1>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs font-medium uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3 text-right">Qty</th>
            </tr>
          </thead>
          <tbody>
            {data.orders.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  No orders yet.
                </td>
              </tr>
            ) : (
              data.orders.map((o) => (
                <tr key={o.orderId} className="hover:bg-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-900">{o.orderId}</td>
                  <td className="px-4 py-3 text-gray-700">{o.customerId}</td>
                  <td className="px-4 py-3 text-gray-700">{o.item}</td>
                  <td className="px-4 py-3 text-right text-gray-700">{o.quantity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>

        <button
          type="button"
          onClick={() => setPage((p) => p + 1)}
          disabled={isPlaceholderData || page >= totalPages}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default App
