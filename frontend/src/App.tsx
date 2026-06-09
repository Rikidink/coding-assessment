import { useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { fetchOrders } from "./api/orders"

const PAGE_SIZE = 5

type SortBy = "orderId" | "customerId" | "item" | "quantity"

const columns = [
  { key: "orderId", label: "Order", align: "left" },
  { key: "customerId", label: "Customer", align: "left" },
  { key: "item", label: "Item", align: "left" },
  { key: "quantity", label: "Qty", align: "right" },
] as const

const pageButtonClass =
  "rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:cursor-pointer hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"

function App() {
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<{ by: SortBy; dir: "asc" | "desc" }>({
    by: "orderId",
    dir: "asc",
  })

  const { data, isPending, isError, error, isPlaceholderData } = useQuery({
    queryKey: ['orders', page, sort.by, sort.dir],
    queryFn: () => fetchOrders({ page, pageSize: PAGE_SIZE, sortBy: sort.by, sortDir: sort.dir }),
    placeholderData: keepPreviousData,
  });

  function toggleSort(by: SortBy) {
    setPage(1) // reset to page 1 when sorting
    setSort((s) =>
      s.by === by
        ? { by, dir: s.dir === "asc" ? "desc" : "asc" }
        : { by, dir: "asc" }
    )
  }

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
              {columns.map((col) => (
                <th key={col.key} className={`px-4 py-3 ${col.align === "right" ? "text-right" : ""}`}>
                  <button
                    type="button"
                    onClick={() => toggleSort(col.key)}
                    className="inline-flex items-center gap-1 uppercase hover:text-gray-700 hover:cursor-pointer"
                  >
                    {col.label}
                    <span className="text-gray-400">
                      {sort.by === col.key ? (sort.dir === "asc" ? "▲" : "▼") : ""}
                    </span>
                  </button>
                </th>
              ))}
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
          className={pageButtonClass}
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
          className={pageButtonClass}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default App
