import { useCategoriesStore } from "../../store"
import { TableActions } from "./TableActions"

export const CategoryRow = ({category , onEdit}) => {
    const {deleteCategory} = useCategoriesStore()
  return (
    <>
        <tr className="text-gray-600 text-sm hover:bg-gray-50 transition">
            <td className="px-6 py-4 font-medium text-gray-800 line-clamp-1 flex items-center gap-4">
                <span>{category.name}</span>
            </td>
            <td className="px-6 py-4">{category.slug}</td>
            <td className="px-6 py-4">{category?.products?.length || 0}</td>
            <td className="px-6 py-4">
                <TableActions>
                    <button onClick={onEdit} className="edit flex items-center gap-3 px-4 py-2 w-full text-left text-xs font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        Edit Category
                    </button>

                    <div className="h-px bg-gray-100 my-1 mx-2"></div>

                    <button onClick={ () => deleteCategory(category.documentId)} className="delete flex items-center gap-3 px-4 py-2 w-full text-left text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer whitespace-nowrap">
                        <span className="w-2 h-2 rounded-full bg-red-600"></span>
                        Delete Category
                    </button>
                </TableActions>
            </td>
        </tr>   
    </>
  )
}
