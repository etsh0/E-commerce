import { useState } from "react"
import More from "../../assets/More.svg"
import { domain } from "../../store"

export const OrderRow = ({order}) => {
    const [isDropdownOpen,setIsdropdowngopen] = useState(false)
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
                    <td className="px-6 py-4">{order.firstName + order.lastName}</td>
                    <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString('en-US')}</td>
                    <td className="px-6 py-4">{item.qty}</td>
                    <td className="px-6 py-4">{item.price}</td>
                    <td className="px-6 py-4">{item.qty * item.price} EGP</td>
                    <td className="px-6 py-4">{order.orderStatus}</td>
                    <td className="px-6 py-4 cursor-pointer relative" onClick={ () => setIsdropdowngopen(!isDropdownOpen)}><img src={More} alt="" />
                        <div className={`absolute right-0 z-50 w-30 bg-white shadow border border-border py-3  flex-col gap-1 ${isDropdownOpen ? "flex" : "hidden"}`}>
                            <button className="px-2 py-1 w-full text-left font-medium text-sm hover:bg-secondary transition-colors duration-300 cursor-pointer whitespace-nowrap">Change Status</button>
                        </div>
                    </td>
                </tr>
            ))
        }
    </>
  )
}
