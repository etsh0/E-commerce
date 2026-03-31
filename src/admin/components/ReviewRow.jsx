import { BsStar, BsStarFill } from "react-icons/bs"
import { TableActions } from "./TableActions"



export const ReviewRow = ({review, onDelete}) => {


  return (
    <>
        <tr className="text-gray-600 text-sm hover:bg-gray-50 transition">
            <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-4">
                <div className="bg-secondary text-[#4078FF] px-4 py-3 rounded">{review?.reviewer_name.slice(0,2).toUpperCase()}</div>
                <span className="truncate">{review?.reviewer_name}</span>
            </td>
            <td className="px-6 py-4">
                {review?.product?.title}
            </td>
            <td className="px-6 py-4 max-w-50 truncate whitespace-nowrap ">
                {review?.comment}
            </td>
            <td className="px-6 py-4 flex items-center">
                {
                    [1,2,3,4,5].map( (num) => (
                        <span key={num}>
                            {
                                num <= review?.rating ?  (<BsStarFill className="text-text" />) : (<BsStar className="text-text" />)
                            }
                        </span>
                    ))
                }
            </td>
            <td className="px-6 py-4">
                <TableActions>
                    <button onClick={onDelete} className="delete flex items-center gap-3 px-4 py-2 w-full text-left text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer whitespace-nowrap">
                        <span className="w-2 h-2 rounded-full bg-red-600"></span>
                        Delete Review
                    </button>
                </TableActions>
            </td>
        </tr>   
    </>
  )
}
