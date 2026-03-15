import { domain, useCartStore } from "../../store"
import { Quantity } from './Quantity'
import { MdClose } from 'react-icons/md'

export const OrderItem = ({order}) => {
    const setUpdateCart = useCartStore(state => state.setUpdateCart);
    const removeCartItem = useCartStore(state => state.removeCartItem);
  return (
    <>
        <div className="cart-item flex flex-col sm:flex-row gap-4 justify-between w-full">
            <div className="flex items-center gap-8 md:gap-8">
                <div className="image bg-secondary">
                    <img className="w-15 md:w-18 aspect-square object-contain" src={domain + order.images[0].url} alt="" />
                </div>
                <div>
                    <h3 className="text-sm md:text-base font-medium mb-2 line-clamp-1">{order?.title}</h3>
                    <div className="text-xs md:text-sm text-text font-medium flex items-center gap-2">{order?.selectedColor && "Color:"}<div style={{ backgroundColor: order?.selectedColor }} className="w-3 h-3 rounded-full"></div>{order?.selectedSize && "— Size:"}<span> {order?.selectedSize}</span></div>
                </div>
            </div>
            <div className="flex items-center gap-8">
                <span className="text-sm md:text-base font-medium">{order?.price}</span>
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
