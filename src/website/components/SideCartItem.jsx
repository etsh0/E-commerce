import { MdClose } from "react-icons/md"
import img from "../../assets/T-Shirt.svg"
import { Quantity } from "./Quantity"


export const SideCartItem = () => {
  return (
    <>
        <div className="cart-item flex items-center gap-6">
            <div className="image bg-secondary relative">
                <img className="w-17 sm:w-20 aspect-square" src={img} alt="" />
                <MdClose size={"20px"} className="absolute top-0 right-0 text-text cursor-pointer" />
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <h4 className="text-xs md:text-sm line-clamp-1">Raw Black T-Shirt Lineup</h4>
                    <div className="text-xs text-text font-medium flex items-center gap-2"><div className="w-3 h-3 bg-[#98BE9E] rounded-full"></div>—<span>M</span></div>
                </div>
                <div className="flex items-center gap-4">
                    <Quantity />
                    <span className="text-sm">$75.00</span>
                </div>
            </div>
        </div>
    </>
  )
}
