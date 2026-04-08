import { useEffect, useState } from "react"
import { SearchBar } from "../../components/SearchBar"
import { OrderRow } from "../components/OrderRow"
import { useAuthAdmin, useOrderStore } from "../../store"

export const Orders = () => {
  const {fetchAllOrders, allOrders} = useOrderStore()
  const {adminToken} = useAuthAdmin()

  const [activeFilter, setActiveFilter] = useState("all")

  const filters = [
    { name: "All Orders", value: "all" },
    { name: "Pending", value: "pending" },
    { name: "Processing", value: "processing" },
    { name: "Shipped", value: "shipped" },
    { name: "Delivered", value: "delivered" },
    { name: "Cancelled", value: "cancelled" },
  ]

  useEffect( () => {
    fetchAllOrders(adminToken,"",activeFilter)
  } ,[activeFilter])

  return (
    <>
      <div className='bg-secondary px-10'>
        <div className="shadow bg-white border border-border px-6 py-8 flex flex-col h-screen">
            <div className="header flex items-center justify-between">
              <h4 className="text-lg text-primary font-semibold">Orders</h4>
              <SearchBar activeFilter={activeFilter} />
            </div>

            {/* filter order status */}
            <div className="flex items-center gap-2 py-4 scrollbar-hide">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase transition-all cursor-pointer whitespace-nowrap
                    ${activeFilter === filter.value 
                      ? "bg-primary text-white" 
                      : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 border border-gray-200"
                    }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>

            <div className="grow overflow-auto mt-8">
                <table className="w-full text-left">
                  <thead className="sticky -top-1 bg-white z-10">
                    <tr className="text-text border-y border-border">
                      <th className="px-6 py-4 font-medium whitespace-nowrap">Order</th>
                      <th className="px-6 py-4 font-medium whitespace-nowrap">Order ID</th>
                      <th className="px-6 py-4 font-medium whitespace-nowrap">Customer</th>
                      <th className="px-6 py-4 font-medium whitespace-nowrap">Phone</th>
                      <th className="px-6 py-4 font-medium whitespace-nowrap">Date</th>
                      <th className="px-6 py-4 font-medium whitespace-nowrap">Items</th>
                      <th className="px-6 py-4 font-medium whitespace-nowrap">Price</th>
                      <th className="px-6 py-4 font-medium whitespace-nowrap">Total</th>
                      <th className="px-6 py-4 font-medium whitespace-nowrap">Status</th>
                      <th className="px-6 py-4 font-medium whitespace-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border overflow-auto">
                    {
                      allOrders.map( (order) => (
                        <OrderRow key={order.documentId} order={order} />
                      ))
                    }
                  </tbody>
                </table>
            </div>
        </div>
      </div>
    </>
  )
}
