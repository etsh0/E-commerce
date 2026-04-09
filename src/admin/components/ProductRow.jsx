import { domain, useProductStore } from "../../store"
import { FaCheck } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import { TableActions } from "./TableActions"
import { Link } from "react-router-dom"
import noImg from "../../assets/noImg.png"

export const ProductRow = ({product, onEdit}) => {
    const{deleteProduct} = useProductStore()

    return (
        <>
        <tr className="text-gray-600 text-sm hover:bg-gray-50 transition">
            <td className="px-6 py-4 font-medium text-gray-800 line-clamp-1 flex items-center gap-2">
                <img className="w-10 object-contain" src={product?.images?.[0]?.url ? domain + product.images[0].url : noImg} alt="" />
                <span>{product?.title}</span>
            </td>
            <td className="px-6 py-4">{product?.price}</td>
            <td className="px-6 py-4">{product?.stock_status}</td>
            <td className="px-6 py-4">{product?.available_qty}</td>
            <td className="px-6 py-4">{product?.category?.name}</td>
            <td className="px-6 py-4">
                {
                    product?.isFeatured ? <FaCheck /> : <IoClose size={"20"} />
                }      
            </td>
            <td className="px-6 py-4">
                {
                    product?.isBestSelling ? <FaCheck /> : <IoClose size={"20"} />
                } 
            </td>
            <td className="px-6 py-4">
                <TableActions>
                    <Link to={`/shop/product-details/${product?.documentId}`} target="_blank" className="edit flex items-center gap-3 px-4 py-2 w-full text-left text-xs font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        View Product
                    </Link>
                    <div className="h-px bg-gray-100 my-1 mx-2"></div>
                    <button onClick={onEdit} className="edit flex items-center gap-3 px-4 py-2 w-full text-left text-xs font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">
                        <span className="w-2 h-2 rounded-full bg-emerald-900"></span>
                        Edit Product
                    </button>
                    <div className="h-px bg-gray-100 my-1 mx-2"></div>
                    <button onClick={() => deleteProduct(product?.documentId)} className="delete flex items-center gap-3 px-4 py-2 w-full text-left text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer whitespace-nowrap">
                        <span className="w-2 h-2 rounded-full bg-red-600"></span>
                        Delete Product
                    </button>
                </TableActions>
            </td>
        </tr>
    </>
  )
}
