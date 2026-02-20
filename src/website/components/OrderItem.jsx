import img from "../../assets/T-Shirt.svg"
import { Quantity } from './Quantity'
import { MdClose } from 'react-icons/md'

export const OrderItem = () => {
  return (
    <>
        <div className="cart-item flex flex-col sm:flex-row gap-4 justify-between w-full">
            <div className="flex items-center gap-8 md:gap-8">
                <div className="image bg-secondary">
                    <img className="w-15 md:w-18 aspect-square" src={img} alt="" />
                </div>
                <div>
                    <h3 className="text-sm md:text-base font-medium mb-2 line-clamp-1">Raw Black T-Shirt Lineup</h3>
                    <div className="text-xs md:text-sm text-text font-medium flex items-center gap-2">Color:<div className="w-3 h-3 bg-[#98BE9E] rounded-full"></div>—<span>Size: M</span></div>
                </div>
            </div>
            <div className="flex items-center gap-8">
                <span className="text-sm md:text-base font-medium">$75.00</span>
                <Quantity />
                <div className="close bg-secondary p-2 cursor-pointer">
                    <MdClose size={"20px"} />
                </div>
            </div>
        </div>
    </>
  )
}
