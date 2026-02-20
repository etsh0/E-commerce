import { NavLink } from "react-router-dom"
import img from "../../assets/T-Shirt.svg"
export const AccountOrders = () => {
  return (
    <>
        <div className="">
            <h4 className="text-xl font-medium text-primary mb-8">My Orders</h4>
            <div className="orders-container overflow-auto flex flex-col gap-6">
                {/* order item */}
                <div className="order-item flex justify-between">
                    <div className="flex items-center gap-4">
                        <div className="image bg-secondary">
                            <img className="aspect-square w-20" src={img} alt="" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-sm font-medium text-primary">Raw Black T-Shirt Lineup</h3>
                            <p className="text-xs text-text">Ordered on: 27 July 2023</p>
                            <span className="font-semibold text-primary">$70.00</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-xs font-medium underline">Processing</span>
                        <NavLink >
                            <button className="text-primary text-sm border border-primary py-2 px-4 rounded font-semibold hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer whitespace-nowrap">View Item</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
