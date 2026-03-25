import { useState } from "react";
import { domain, useAuthAdmin, useOrderStore } from "../../store"
import { TableActions } from "./TableActions"
import { createPortal } from "react-dom";
import close from "../../assets/close.svg"
import { TiArrowDown } from "react-icons/ti";

export const OrderRow = ({order}) => {

    const {changeStatusOrder,deleteOrder} = useOrderStore()
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(order.order_status);
    const {adminToken} = useAuthAdmin()

    const statusColor = {
        pending: { label: "Pending", color: "bg-amber-100 text-amber-600 border-amber-200" },
        processing: { label: "Processing", color: "bg-blue-100 text-blue-600 border-blue-200" },
        shipped: { label: "Shipped", color: "bg-purple-100 text-purple-600 border-purple-200" },
        delivered: { label: "Delivered", color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
        cancelled: { label: "Cancelled", color: "bg-rose-100 text-rose-600 border-rose-200" },
    };
    
    return (
    <>
        {
            order.cartItems?.map( (item) => (
                <tr key={item.documentId} className="text-gray-600 text-sm hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800 max-w-50">
                    <div className="flex items-center gap-2">
                        <img 
                        className="w-10 h-10 rounded object-contain shrink-0" 
                        src={domain + item.images[0]?.url} 
                        alt="" 
                        />
                        <span className="text-xs md:text-sm font-medium text-primary truncate">
                        {item.title}
                        </span>
                    </div>
                    </td>
                    <td className="px-6 py-4">#{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{`${order.firstName} ${order.lastName}`}</td>
                    <td className="px-6 py-4">{order.phone}</td>
                    <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString('en-US')}</td>
                    <td className="px-6 py-4">{item.qty}</td>
                    <td className="px-6 py-4">{item.price}</td>
                    <td className="px-6 py-4">{item.qty * item.price} EGP</td>
                    <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${statusColor[order.order_status]?.color}`}>
                            {order.order_status}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        <TableActions>
                            <button onClick={() => setIsStatusModalOpen(true)} className="edit flex items-center gap-3 px-4 py-2 w-full text-left text-xs font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Change Status
                            </button>
                            <button onClick={() => setIsDetailsOpen(true)} className="edit flex items-center gap-3 px-4 py-2 w-full text-left text-xs font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                View Details
                            </button>
                            <div className="h-px bg-gray-100 my-1 mx-2"></div>
                            <button onClick={() => deleteOrder(adminToken,order.documentId)} className="delete flex items-center gap-3 px-4 py-2 w-full text-left text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer whitespace-nowrap">
                                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                                Delete Order
                            </button>
                        </TableActions>
                    </td>
                </tr>
            ))
        }
        {isStatusModalOpen && createPortal(
                <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-112.5 p-10 relative animate-in fade-in zoom-in duration-200">
                        <h2 className="text-text text-sm font-medium mb-4">
                            Change the order status to:
                        </h2>
                        <p className="text-gray-400 text-[12px] mb-6 uppercase tracking-wider">Order ID: #{order.id}</p>
                        <div className="flex items-center gap-3">
                            <div className="relative grow">
                                <select 
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="w-full h-10 px-4 bg-white border border-border rounded-lg text-text text-sm appearance-none cursor-pointer focus:outline-none transition-all"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <TiArrowDown size={"20"}/>
                                </div>
                            </div>

                            <button 
                                onClick={() => {
                                    changeStatusOrder(adminToken,order.documentId,selectedStatus)
                                    setIsStatusModalOpen(false);
                                }}
                                className="h-10 px-6 bg-primary text-white rounded-lg font-bold text-sm hover:bg-black transition-all active:scale-95 shadow-lg shadow-black/10 cursor-pointer"
                            >
                                Save
                            </button>
                        </div>
                        <button 
                            onClick={() => setIsStatusModalOpen(false)} 
                            className="absolute top-6 right-6 cursor-pointer"
                        >
                            <img src={close} alt="" />
                        </button>
                    </div>
                </div>,
                document.body
        )}


        {isDetailsOpen && createPortal(
                <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/40 backdrop-blur-[3px]">
                    <div className="bg-white rounded shadow-2xl w-full max-w-150 max-h-[90vh] overflow-y-auto p-8 relative animate-in fade-in zoom-in duration-200">
                        
                        {/* Header */}
                        <div className="mb-8 border-b border-gray-100 pb-4">
                            <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
                            <p className="text-xs text-gray-400 font-medium uppercase mt-1">ID: #{order.id || order.documentId}</p>
                        </div>

                        {/* Customer Info Section */}
                        <div className="grid grid-cols-2 gap-6 mb-8 bg-gray-50 p-5 rounded-2xl">
                            <div>
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-1">Customer</h4>
                                <p className="text-sm font-semibold text-gray-700">{order.firstName} {order.lastName}</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-1">Phone</h4>
                                <p className="text-sm font-semibold text-gray-700">{order.phone}</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-1">Shipping Address</h4>
                                <p className="text-sm font-semibold text-gray-700 leading-relaxed">
                                    {order.address}, {order.city}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-1">Governorate</h4>
                                <p className="text-sm font-semibold text-gray-700">{order.governorate}</p>
                            </div>
                        </div>

                        {/* Order Items Table */}
                        <div className="mb-8">
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-3 ml-1">Purchased Items</h4>
                            <div className="border border-gray-100 rounded-2xl overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">Product</th>
                                            <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase text-center">Qty</th>
                                            <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase text-right">Shipping Price</th>
                                            <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase text-right">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {/* هنا بنعمل Map على الـ cartItems اللي جوه الـ order */}
                                        {order.cartItems?.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-3 text-sm font-medium text-gray-700">{item.name || item.title}</td>
                                                <td className="px-4 py-3 text-sm text-gray-500 text-center">x{item.qty}</td>
                                                <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right font-mono">90 EGP</td>
                                                <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right font-mono">{item.price}EGP</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Total Section */}
                        <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                            <p className="text-sm font-bold text-gray-400 uppercase">Total Amount</p>
                            <p className="text-2xl text-primary font-bold">{order.totalAmount}EGP</p>
                        </div>

                        {/* Close Button */}
                        <button 
                            onClick={() => setIsDetailsOpen(false)}
                            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-400 rounded-full hover:bg-red-50 hover:text-red-500 transition-all cursor-pointer"
                        >
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        </button>
                    </div>
                </div>,
                document.body
            )}
    </>
  )
}


