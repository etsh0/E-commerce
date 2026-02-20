import { NavLink } from "react-router-dom"
import img from "../../assets/T-Shirt.svg"
import { AccountHeader } from "../components/AccountHeader"

export const AccountWishlist = () => {
  return (
    <>
        <div className="">
            <AccountHeader title={"My Wishlist"} />
            <div className="orders-container overflow-auto flex flex-col gap-6">
                {/* wishlist item */}
                <div className="order-item flex flex-col sm:flex-row gap-4 justify-between border-b-2 border-border pb-4">
                    <div className="flex items-center gap-4">
                        <div className="image bg-secondary">
                            <img className="aspect-square w-17 md:w-20" src={img} alt="" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xs md:text-sm font-medium text-primary line-clamp-1">Raw Black T-Shirt Lineup</h3>
                            <p className="text-xs text-text">Ordered on: 27 July 2023</p>
                            <button className="text-red-500 w-fit self-start font-medium text-xs cursor-pointer">Remove item</button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6">
                        <span className="font-medium">$75.00</span>
                        <NavLink >
                            <button className="text-primary text-xs sm:text-sm border border-primary py-2 px-4 rounded font-semibold hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer whitespace-nowrap">Add to cart</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
