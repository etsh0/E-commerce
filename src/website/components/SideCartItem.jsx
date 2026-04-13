import { MdClose } from "react-icons/md"
import { Quantity } from "./Quantity"
import { domain, useCartStore } from "../../store"
import noImg from "../../assets/noImg.png"
import { getFinalPrice } from "../../utils/PriceUtils"


export const SideCartItem = ({item}) => {
    const setUpdateCart = useCartStore(state => state.setUpdateCart);
    const removeCartItem = useCartStore(state => state.removeCartItem);
    const finalPrice = getFinalPrice(item?.price, item?.discount);

  return (
    <>
        <div className="flex items-center gap-6">
            <div className="image bg-secondary relative">
                <img className="w-17 sm:w-20 aspect-square object-contain" src={item?.images?.length > 0 ? domain + item?.images[0].url : noImg} alt={item?.title || "product"} />
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
                    <div className="flex items=center gap-2">
                        <span className={`text-sm ${item?.discount ? "text-red-500" : ""}`}>
                            {finalPrice} EGP
                        </span>
                        {
                            item?.discount > 0 && (
                            <span className="text-xs line-through opacity-50">{item?.price} EGP</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
