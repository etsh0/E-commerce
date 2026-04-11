import { MdClose } from "react-icons/md"
import { useCartStore, useDrawerStore, useUiStore } from "../../store"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { SideCartItem } from "./SideCartItem"


export const SideCart = () => {
    const {isSideCartOpen,CloseSideCart} = useDrawerStore()
    const {cart, getSubTotal} = useCartStore()
    const navigate = useNavigate()
    const location = useLocation();
    const{setLoading} = useUiStore()

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

    const handleViewCart = () => {

        if (location.pathname === '/cart') {
            CloseSideCart();
            return; 
        }
        
        setLoading("isAppLoading", true)
        CloseSideCart()
        navigate("/cart")
    }
  return (
    <>
        <div className={`overlay fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isSideCartOpen ? "opacity-100 visible backdrop-blur-xs" : "opacity-0 invisible"}`} onClick={CloseSideCart}></div>
        <div className={`sidecrat flex flex-col w-80 sm:w-100 h-screen bg-white shadow-lg fixed top-0 right-0 z-1000 transform transition-transform duration-300 ease-in-out ${isSideCartOpen ? "translate-x-0" : "translate-x-300"}`}>
            <div className="bg-secondary/50 p-8 w-full flex items-center justify-between">
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

                <button onClick={handleViewCart} className="btn-animate bg-primary text-white md:before:bg-white md:hover:text-primary w-full mb-8">
                    <span>View Cart</span>
                </button>

                <button  
                    disabled={cart.length === 0}
                    onClick={() => {
                            if (cart.length > 0) {
                                CloseSideCart();
                                navigate("/checkout");
                            }
                    }}
                    className={`btn-animate bg-white text-primary md:before:bg-primary md:hover:text-white w-full mb-8 ${cart.length === 0 ? "cursor-not-allowed" : ""}`}>
                    <span>Checkout</span>
                </button>        
                
            </div>
        </div>
    </>
  )
}
