import { Badge } from "../../components/Badge"

export const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col gap-6 p-10">
          <div className="grid grid-cols-3 gap-6">
            <div className="box-total-sales shadow border border-border rounded-lg bg-white p-6">
                <div className="flex items-center justify-between">
                    <div className="">
                      <h4 className="text-primary text-base font-bold">Total Sales</h4>
                      <span className="text-xs text-text uppercase">this month</span>
                    </div>
                    <div className="total-price text-xl text-primary font-bold">$4,235</div>
                </div>
            </div>
            <div className="box-total-sales shadow border border-border rounded-lg bg-white p-6">
                <div className="flex items-center justify-between">
                    <div className="">
                      <h4 className="text-primary text-base font-bold">Customers</h4>
                      <span className="text-xs text-text uppercase">this month</span>
                    </div>
                    <div className="total-price text-xl text-primary font-bold">2,571</div>
                </div>
            </div>
            <div className="box-total-sales shadow border border-border rounded-lg bg-white p-6">
                <div className="flex items-center justify-between">
                    <div className="">
                      <h4 className="text-primary text-base font-bold">Orders</h4>
                      <span className="text-xs text-text uppercase">Monthly GOALS : 1,000</span>
                    </div>
                    <div className="total-price text-xl text-primary font-bold">734</div>
                </div>
            </div>
          </div>
          <div className="flex gap-6">
              <div className="w-[382.66px] shadow border border-border rounded-lg bg-white p-6">
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
              </div>
              <div className="grow flex flex-col shadow border border-border rounded-lg bg-white p-6 h-130">
                  <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-bold text-primary">Recent Orders</h4>
                  </div>
                  <div class="overflow-y-auto grow">
                    <table class="w-full text-left">
                      <thead className="sticky top-0 bg-white z-10">
                        <tr class="text-text text-sm border-b border-border">
                          <th class="px-6 py-4 font-medium">Item</th>
                          <th class="px-6 py-4 font-medium">Date</th>
                          <th class="px-6 py-4 font-medium">Total</th>
                          <th class="px-6 py-4 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-border overflow-auto">
                        <tr class="text-gray-600 hover:bg-gray-50 transition">
                          <td class="px-6 py-4 font-medium text-gray-800">Mens Black T-Shirts</td>
                          <td class="px-6 py-4">20 Mar, 2023</td>
                          <td class="px-6 py-4">$75.00</td>
                          <td class="px-6 py-4">Processing</td>
                        </tr>
                        <tr class="text-gray-600 hover:bg-gray-50 transition">
                          <td class="px-6 py-4 font-medium text-gray-800">Mens Black T-Shirts</td>
                          <td class="px-6 py-4">20 Mar, 2023</td>
                          <td class="px-6 py-4">$75.00</td>
                          <td class="px-6 py-4">Processing</td>
                        </tr>
                        <tr class="text-gray-600 hover:bg-gray-50 transition">
                          <td class="px-6 py-4 font-medium text-gray-800">Mens Black T-Shirts</td>
                          <td class="px-6 py-4">20 Mar, 2023</td>
                          <td class="px-6 py-4">$75.00</td>
                          <td class="px-6 py-4">Processing</td>
                        </tr>
                        <tr class="text-gray-600 hover:bg-gray-50 transition">
                          <td class="px-6 py-4 font-medium text-gray-800">Mens Black T-Shirts</td>
                          <td class="px-6 py-4">20 Mar, 2023</td>
                          <td class="px-6 py-4">$75.00</td>
                          <td class="px-6 py-4">Processing</td>
                        </tr>
                        <tr class="text-gray-600 hover:bg-gray-50 transition">
                          <td class="px-6 py-4 font-medium text-gray-800">Mens Black T-Shirts</td>
                          <td class="px-6 py-4">20 Mar, 2023</td>
                          <td class="px-6 py-4">$75.00</td>
                          <td class="px-6 py-4">Processing</td>
                        </tr>
                        <tr class="text-gray-600 hover:bg-gray-50 transition">
                          <td class="px-6 py-4 font-medium text-gray-800">Mens Black T-Shirts</td>
                          <td class="px-6 py-4">20 Mar, 2023</td>
                          <td class="px-6 py-4">$75.00</td>
                          <td class="px-6 py-4">Processing</td>
                        </tr>
                        </tbody>
                    </table>
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}
