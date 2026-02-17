import { Link } from "react-router-dom"
import { OrderItem } from "../components/OrderItem"


export const CartPage = () => {
  return (
    <>
        <div className='container flex items-start gap-40 py-10 bg-secondary'>
            <div className='flex-1'>
                <h3 className='mb-4 text-xl font-semibold'>Your Cart</h3>
                <div className='flex flex-col gap-6 pt-12 border-t-2 border-border'>
                    <OrderItem />
                    <OrderItem />
                </div>
            </div>
            <div className='border-2 w-120 border-border p-8'>
                <h3 className="font-semibold mb-6">Order Summary</h3>
                <div className="flex flex-col gap-4 mb-4">
                    <div className="flex items-center justify-between">
                        <span className="text-text font-medium">Subtotal</span>
                        <span>$90.00</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-text font-medium">Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-text font-medium">Tax</span>
                        <span>$3.00</span>
                    </div>
                </div>
                <div className="pt-6 border-t-2 border-border">
                    <div className="flex items-center justify-between">
                        <span>Total</span>
                        <span>$100.00</span>
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
