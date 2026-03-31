// import { Badge } from "../../components/Badge"
import { useCutomersStore, useOrderStore } from "../../store"

export const Dashboard = () => {
  
  const {ordersCount, allOrders} = useOrderStore()
  const {customersCount} = useCutomersStore()

  const totalSales = allOrders?.reduce((acc, order) => {
    const orderTotal = order.cartItems?.reduce((sum, item) => {
      return sum + (Number(item.price) * (item.qty || 1));
    }, 0);
    return acc + orderTotal;
  }, 0);


  return (
    <>
      <div className="flex flex-col gap-6 p-10">
          <div className="grid grid-cols-3 gap-6">
            <div className="box-total-sales shadow border border-border rounded-lg bg-white p-6">
                <div className="flex items-center justify-between">
                    <div className="">
                      <h4 className="text-primary text-base font-bold">Total Sales</h4>
                      {/* <span className="text-xs text-text uppercase">this month</span> */}
                    </div>
                    <div className="total-price text-xl text-primary font-bold">{totalSales} EGP</div>
                </div>
            </div>
            <div className="box-total-sales shadow border border-border rounded-lg bg-white p-6">
                <div className="flex items-center justify-between">
                    <div className="">
                      <h4 className="text-primary text-base font-bold">Total Customers</h4>
                      {/* <span className="text-xs text-text uppercase">this month</span> */}
                    </div>
                    <div className="total-price text-xl text-primary font-bold">{customersCount}</div>
                </div>
            </div>
            <div className="box-total-sales shadow border border-border rounded-lg bg-white p-6">
                <div className="flex items-center justify-between">
                    <div className="">
                      <h4 className="text-primary text-base font-bold">Orders</h4>
                      <span className="text-xs text-text uppercase">Monthly GOALS : 1,000</span>
                    </div>
                    <div className="total-price text-xl text-primary font-bold">{ordersCount}</div>
                </div>
            </div>
          </div>
          <div className="flex gap-6">
              {/* <div className="w-[382.66px] shadow border border-border rounded-lg bg-white p-6">
                  <div className="mb-6">
                    <h4 className="text-primary text-base font-bold">Best Selling</h4>
                    <span className="text-xs text-text uppercase">this month</span>
                  </div>
                  <div className="py-6 border-t border-border">
                      <div className="font-bold text-xl">$2,400 — <span className="text-text text-sm font-normal">Total Sales</span></div>
                      <div className="flex flex-col gap-4 mt-6">
                          <Badge title={"Classic Monochrome Tees —  $940 Sales"} />
                          <Badge title={"Monochromatic Wardrobe —  $790 Sales"} />
                          <Badge title={"Essential Neutrals —  $740 Sales"} />
                      </div>
                  </div>
              </div> */}
              <div className="grow flex flex-col shadow border border-border rounded-lg bg-white p-6 h-130">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-primary">Recent Orders</h4>
                  </div>
                  <div className="overflow-y-auto grow">
                    <table className="w-full text-left">
                      <thead className="sticky top-0 bg-white z-10">
                        <tr className="text-text text-sm border-b border-border">
                          <th className="px-6 py-4 font-medium">Item</th>
                          <th className="px-6 py-4 font-medium">Date</th>
                          <th className="px-6 py-4 font-medium">Total</th>
                          <th className="px-6 py-4 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border overflow-auto">


                        {
                          allOrders.slice(0,7).map( (order) => (
                            order.cartItems.map( item => (
                              <tr className="text-gray-600 hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-800">{item.title}</td>
                                <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString('en-US')}</td>
                                <td className="px-6 py-4">{item.qty * item.price} EGP</td>
                                <td className="px-6 py-4">{order.order_status}</td>
                              </tr>
                            ))
                          ))
                        }
                        </tbody>
                    </table>
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}
