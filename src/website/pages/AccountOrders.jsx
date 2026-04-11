import { Link, NavLink } from "react-router-dom"
import { AccountHeader } from "../components/AccountHeader"
import { useAuthStore, useOrderStore, useUiStore } from "../../store"
import { useEffect } from "react"
import { domain } from './../../store/index';
import noImg from "../../assets/noImg.png"
import { OrderSkeleton } from "../../components/OrderSkeleton";


export const AccountOrders = () => {

    const {fetchUserOrders, userOrders, isOrdersLoading} = useOrderStore()
    const {user, token} = useAuthStore()
    const {setLoading} = useUiStore()

  
    
    useEffect( () => {    
        fetchUserOrders(user?.documentId , token)
    },[user , token])

    const statusColor = {
        pending: { label: "Pending", color: " text-amber-600" },
        processing: { label: "Processing", color: " text-blue-600" },
        shipped: { label: "Shipped", color: "text-purple-600" },
        delivered: { label: "Delivered", color: "text-emerald-600" },
        cancelled: { label: "Cancelled", color: " text-rose-600" },
    };

  return (
    <>
        <div className="">
            <AccountHeader title={"My Orders"} />
            <div className="orders-container overflow-auto flex flex-col gap-1">
                {
                    isOrdersLoading ? (
                        [1,2].map( (item) => (
                            <OrderSkeleton key={item} />
                        ))
                    ) : (
                userOrders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                        <h3 className="text-xl font-bold text-primary mb-2">No orders yet</h3>
                        <p className="text-sm text-text max-w-70 mb-6">
                            Looks like you haven't made your choice yet. Your future orders will appear here!
                        </p>

                        <Link to="/shop" className="btn-animate bg-primary text-white md:before:bg-white md:hover:text-primary">
                            <span>Start Shopping</span>
                        </Link>
                    </div>
                    ) : (
                        userOrders.map((order) => (
                            <div key={order.documentId} className="order-wrapper border-b-2 border-border pb-6 mb-6">
            
                                <div className="flex justify-between items-center mb-4 bg-secondary/30 p-2 rounded">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-xs text-text font-bold">Order ID: #{order.id}</p>
                                        <p className="text-xs text-text font-bold">
                                            Order Status:
                                            <span className={`text-xs font-bold uppercase tracking-wider ${statusColor[order.order_status]?.color}`}>
                                                {order.order_status}
                                            </span>
                                        </p>
                                        <p className="text-[10px] text-text">
                                         Date: {new Date(order.createdAt).toLocaleDateString('en-US')}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-medium underline">{order.orderStatus}</span>
                                        <span className="font-semibold text-primary">Total: {order.totalAmount} EGP</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {order.cartItems && order.cartItems.map((item) => (
                                        <div key={item.documentId} className="order-item flex items-center justify-between gap-4 pl-4">
                                        
                                            <div className="flex items-center gap-4">
                                                <div className="image bg-secondary rounded overflow-hidden">
                                                    <img className="aspect-square w-16 md:w-20 object-contain" src={item?.images?.length > 0 ? domain + item.images[0].url : noImg} alt={item.title} />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <h3 className="text-xs md:text-sm font-medium text-primary line-clamp-1">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-[10px] text-text">Qty: {item.qty}</p>
                                                    <span className="text-xs font-semibold text-primary">{item.price} EGP</span>
                                                </div>
                                            </div>

                                            <NavLink to={`/shop/product-details/${item.documentId}`}>
                                                <button onClick={() => setLoading("isAppLoading", true)} className="text-[10px] sm:text-xs py-2 px-3 font-semibold whitespace-nowrap btn-animate bg-white text-primary md:before:bg-primary md:hover:text-white">
                                                    <span>View Product</span>
                                                </button>
                                            </NavLink>
                                        
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )
                    )
                }
            </div>
        </div>
    </>
  )
}
