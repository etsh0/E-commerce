
import { Link } from 'react-router-dom';
export const CheckoutPage = () => {
  return (
    <>
        <div className="container flex items-start gap-40 py-20 bg-secondary">

            <div className="flex-1">
                <h3 className="text-xl font-medium mb-10">Shippind Address</h3>
                <form className="w-full flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <label htmlFor="">Street Address</label>
                        <input className="input" type="text" />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex w-full flex-col gap-4">
                            <label htmlFor="">City</label>
                            <input className="input" type="text" />
                        </div>
                        <div className="flex w-full flex-col gap-4">
                            <label htmlFor="">State</label>
                            <input className="input" type="text" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex w-full flex-col gap-4">
                            <label htmlFor="">Zip Code</label>
                            <input className="input" type="text" />
                        </div>
                        <div className="flex w-full flex-col gap-4">
                            <label htmlFor="">Country</label>
                            <input className="input" type="text" />
                        </div>
                    </div>
                    <div className="flex gap-4">
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

            <div className="w-120">
                <h3 className="font-semibold mb-6">Your Order</h3>
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
