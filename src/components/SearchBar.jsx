import { useEffect, useState } from "react"
import Search from "../assets/Search.svg"
import { useAuthAdmin, useCategoriesStore, useOrderStore } from "../store"
import { useLocation } from "react-router-dom"

export const SearchBar = ({fetchAllProducts, fetchAllUsers, fetchAllReviews, activeFilter}) => {
  const {fetchCategories} = useCategoriesStore()
  const {fetchAllOrders} = useOrderStore()
  const location = useLocation()
  const [searchQuery, setsearchQuery] = useState('')
  const {adminToken} = useAuthAdmin()

  useEffect( () => {
    const delayDebounceFn = setTimeout( () => {
      if(location.pathname.includes("categories")) {
        fetchCategories(searchQuery)
      } 
      else if (location.pathname.includes("products")) {
        fetchAllProducts(searchQuery)
      }
      else if (location.pathname.includes("reviews")) {
        fetchAllReviews(searchQuery)
      }
      else if (location.pathname.includes("customers")) {        
        fetchAllUsers(searchQuery)
      }
      else if (location.pathname.includes("orders")) {
        fetchAllOrders(adminToken,searchQuery,activeFilter)
      }
    } , 500)

    return () => clearTimeout(delayDebounceFn);
  } ,[searchQuery, location.pathname])

  const getPlaceholder = () => {
    if (location.pathname.includes("categories")) return "Search Categories...";
    if (location.pathname.includes("products")) return "Search Products Name...";
    if (location.pathname.includes("customers")) return "Search Customers (Name, Email)...";
    if (location.pathname.includes("orders")) return "Search Orders (Phone, Name,ID)...";
    if (location.pathname.includes("reviews")) return "Search Reviews (UserName)...";
    return "Search...";
  };

  return (
    <>
        <div className="search-bar relative ">
            <input onChange={(e) => setsearchQuery(e.target.value)} value={searchQuery} type='text' placeholder={getPlaceholder()} className=' w-75 pl-11.75 input text-xs' />
            <img src={Search} alt="" className='absolute top-[50%] translate-y-[-50%] left-4' />
        </div>
    </>
  )
}
