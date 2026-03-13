import { MdClose } from "react-icons/md"
import { Quantity } from "./Quantity"
import { domain, useCartStore } from "../../store"


export const SideCartItem = ({item}) => {
    const setUpdateCart = useCartStore(state => state.setUpdateCart);
    const removeCartItem = useCartStore(state => state.removeCartItem);
  return (
    <>
        <div className="cart-item flex items-center gap-6">
            <div className="image bg-secondary relative">
                <img className="w-17 sm:w-20 aspect-square object-contain" src={domain + item?.images[0].url} alt="" />
                <MdClose onClick={() => removeCartItem(item.id ,item.selectedSize, item.selectedColor )} size={"20px"} className="absolute top-0 right-0 text-text cursor-pointer" />
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <h4 className="text-xs md:text-sm line-clamp-1">{item?.title}</h4>
                    <div className="text-xs text-text font-medium flex items-center gap-2"><div style={{ backgroundColor: item?.selectedColor }} className="select-color w-3 h-3 rounded-full"></div>{item?.selectedSize && "—"}<span className="select-size uppercase">{item?.selectedSize}</span></div>
                </div>
                <div className="flex items-center gap-4">
                    <Quantity qty={item?.qty} 
                    Increment={() => setUpdateCart(item.id , item.selectedSize, item.selectedColor, item.qty + 1)} 
                    Decrement={() => setUpdateCart(item.id , item.selectedSize, item.selectedColor, item.qty - 1)}/>
                    <span className="text-sm">${item?.price}</span>
                </div>
            </div>
        </div>
    </>
  )
}
