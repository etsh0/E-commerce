import { Link } from "react-router-dom"
import { OrderItem } from "../components/OrderItem"
import { useCartStore } from "../../store"



export const CartPage = () => {

    const {cart, getSubTotal, shippingPrice} = useCartStore()
    const subTotal = getSubTotal()

  return (
    <>
        <div className='container flex flex-col xl:flex-row gap-20 py-10 items-start'>
            <div className='flex-1'>
                <h3 className='mb-4 text-xl font-semibold'>Your Cart</h3>
                <div className='flex flex-col gap-6 py-12 border-y-2 border-border w-full overflow-y-auto'>
                    {
                        cart.length === 0 ? (<div className="text-center text-text uppercase my-auto">Your cart is empty</div>) : (
                            cart.map( (order) => (
                                <OrderItem key={order.documentId} order={order}/>
                            ))
                        )
                    }
                </div>
            </div>
            <div className='border-2 w-full xl:w-120 border-border p-6 md:p-8'>
                <h3 className="font-semibold mb-6">Order Summary</h3>
                <div className="flex flex-col gap-4 mb-4">
                    <div className="flex items-center justify-between">
                        <span className="text-text font-medium">Subtotal</span>
                        <span>${subTotal}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-text font-medium">Shipping</span>
                        <span>${cart.length > 0 ? shippingPrice : 0}</span>
                    </div>
                </div>
                <div className="pt-6 border-t-2 border-border">
                    <div className="flex items-center justify-between">
                        <span>Total</span>
                        <span>${cart.length > 0 ? shippingPrice + subTotal : 0}</span>
                    </div>
                    <button className="bg-primary flex items-center justify-center text-white w-full py-2 rounded cursor-pointer whitespace-nowrap my-6">
                        <Link to={"/checkout"}>
                            Checkout
                        </Link>
                    </button>
                    <button className="flex justify-center text-primary self-center font-medium underline w-full">
                        <Link to={"/shop"}>
                            Continue Shopping
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}
