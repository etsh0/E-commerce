
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store';
export const CheckoutPage = () => {

        const {cart, getSubTotal, shippingPrice} = useCartStore()
        const subTotal = getSubTotal()
  return (
    <>
        <div className="container flex flex-col xl:flex-row gap-40 py-20">

            <div className="flex-1">
                <h3 className="text-xl font-medium mb-10">Shippind Address</h3>
                <form className="w-full flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <label htmlFor="">Street Address</label>
                        <input className="input" type="text" />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex w-full flex-col gap-4">
                            <label htmlFor="">City</label>
                            <input className="input" type="text" />
                        </div>
                        <div className="flex w-full flex-col gap-4">
                            <label htmlFor="">State</label>
                            <input className="input" type="text" />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex w-full flex-col gap-4">
                            <label htmlFor="">Zip Code</label>
                            <input className="input" type="text" />
                        </div>
                        <div className="flex w-full flex-col gap-4">
                            <label htmlFor="">Country</label>
                            <input className="input" type="text" />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex w-full flex-col gap-4">
                            <label htmlFor="">Email</label>
                            <input className="input" type="text" />
                        </div>
                        <div className="flex w-full flex-col gap-4">
                            <label htmlFor="">Full name</label>
                            <input className="input" type="text" />
                        </div>
                    </div>
                </form>
            </div>

            <div className="w-full xl:w-120 shadow p-8 h-fit border border-border">
                <h3 className="font-semibold mb-6">Your Order</h3>
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
                        <Link>
                            Place Order
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}
