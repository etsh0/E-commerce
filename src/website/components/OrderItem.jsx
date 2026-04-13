import { domain, useCartStore } from "../../store"
import { Quantity } from './Quantity'
import { MdClose } from 'react-icons/md'
import noImg from "../../assets/noImg.png"
import { getFinalPrice } from "../../utils/PriceUtils"

export const OrderItem = ({order}) => {
    const setUpdateCart = useCartStore(state => state.setUpdateCart);
    const removeCartItem = useCartStore(state => state.removeCartItem);
    const finalPrice = getFinalPrice(order?.price, order?.discount);

  return (
    <>
        <div className="cart-item flex flex-col gap-4 justify-between w-full">
            <div className="flex items-center gap-8 md:gap-8">
                <div className="image bg-secondary">
                    <img className="w-15 md:w-18 aspect-square object-contain" src={order?.images?.length > 0 ? domain + order.images[0].url : noImg} alt="" />
                </div>
                <div>
                    <h3 className="text-sm md:text-base font-medium mb-2 line-clamp-1">{order?.title}</h3>
                    <div className="text-xs md:text-sm text-text font-medium flex items-center gap-2">{order?.selectedColor && "Color:"}<div style={{ backgroundColor: order?.selectedColor }} className="w-3 h-3 rounded-full"></div>{order?.selectedSize && "— Size:"}<span> {order?.selectedSize}</span></div>
                </div>
            </div>
            <div className="flex items-center gap-8">
                <div className="price flex flex-col gap-2">
                    <span className={`text-sm md:text-base font-medium ${order?.discount ? "text-red-500" : ""}`}>
                        {finalPrice} EGP
                    </span>
                    {
                        order?.discount > 0 && (
                        <span className="text-xs md:text-sm line-through opacity-50">{order?.price} EGP</span>
                    )}
                </div>
                <Quantity qty={order?.qty} 
                Increment={() => setUpdateCart(order.id , order.selectedSize, order.selectedColor, order.qty + 1)} 
                Decrement={() => setUpdateCart(order.id , order.selectedSize, order.selectedColor, order.qty - 1)}/>
                <div  onClick={() => removeCartItem(order.id ,order.selectedSize, order.selectedColor )} className="close bg-secondary p-2 cursor-pointer">
                    <MdClose size={"20px"} />
                </div>
            </div>
        </div>
    </>
  )
}
