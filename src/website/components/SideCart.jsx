import { MdClose } from "react-icons/md"
import { useCartStore, useDrawerStore } from "../../store"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { SideCartItem } from "./SideCartItem"


export const SideCart = () => {
    const {isSideCartOpen,CloseSideCart} = useDrawerStore()
    const {cart, getSubTotal} = useCartStore()
    const navigate = useNavigate()

    const subTotal = getSubTotal()
    
    useEffect( () => {
        if(isSideCartOpen) {
            document.body.style.overflow = 'hidden';
        }else {
            document.body.style.overflow = 'auto'
        }

        return () => {
          document.body.style.overflow = 'auto';
        }
    } ,[isSideCartOpen])
  return (
    <>
        <div className={`overlay fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isSideCartOpen ? "opacity-100 visible backdrop-blur-xs" : "opacity-0 invisible"}`} onClick={CloseSideCart}></div>
        <div className={`sidecrat flex flex-col w-80 sm:w-100 h-screen bg-white shadow-lg fixed top-0 right-0 z-1000 transform transition-transform duration-300 ease-in-out ${isSideCartOpen ? "translate-x-0" : "translate-x-300"}`}>
            <div className="bg-secondary p-8 w-full flex items-center justify-between">
                <h3 className="font-semibold">Shopping Cart</h3>
                <MdClose onClick={CloseSideCart} size={"24px"} className="cursor-pointer" />
            </div>
            <div className="cart-container grow flex flex-col gap-6 overflow-y-auto px-4 md:px-8 py-6">
                {
                    cart.length === 0 ? (<div className="text-center text-text uppercase my-auto">Your cart is empty</div>)
                    :(cart?.map( (item) => (
                        <SideCartItem key={item.documentId} item={item}/>
                    ))) 

                }
            </div>
            <div className="px-8 pt-4 pb-6 border-t-2 border-border">
                <div className="flex items-center justify-between font-medium text-xl mb-6">
                    <span>Total</span>
                    <span>{subTotal} EGP</span>
                </div>
                <Link to={"/cart"}>
                    <button className="bg-primary flex items-center justify-center text-white w-full py-2 rounded cursor-pointer whitespace-nowrap mb-8" onClick={CloseSideCart}>View Cart</button>
                </Link>
                <button 
                    disabled={cart.length === 0} 
                    onClick={() => {
                        if (cart.length > 0) {
                        CloseSideCart();
                        navigate("/checkout");
                        }
                    }}
                    className={`text-text flex m-auto w-fit text-sm underline cursor-pointer 
                        ${cart.length === 0 ? "opacity-50 cursor-not-allowed no-underline" : ""}`}
                    >
                    Checkout
                </button>
            </div>
        </div>
    </>
  )
}
