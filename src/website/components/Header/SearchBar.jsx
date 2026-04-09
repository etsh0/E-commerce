import { useEffect, useState } from 'react'
import Search from '../../../assets/Search.svg'
import { domain } from '../../../store'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import noImg from "../../../assets/noImg.png"

export const SearchBar = ({closeMenu}) => {

    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const navigate = useNavigate()

    useEffect( () => {

        if(!query.trim()) {
            setResults([]);
            return
        }

        let url = domain + '/api/products'
        const fetchSearchResults = async () => {
            try {
                const res = await axios.get(url, {
                    params: {
                        populate: '*',
                        pagination: { limit: 7 },
                        filters: {
                            title: {
                                $containsi : query
                            }
                        }
                    }
                })
                
                setResults(res.data.data)
            }
            catch(error) {
                console.log(error.message);      
            }
        }
        const timer = setTimeout(() => {
            fetchSearchResults()
        }, 700);
        return () => clearTimeout(timer)
    } ,[query])

    const handleProductClick = (product) => {
        navigate(`/shop/product-details/${product.documentId}`)
        setQuery("")
        closeMenu()
    }

  return (
    <>
        <div className="search-bar relative">

            <input 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            onFocus={() => setShowDropdown(true)} 
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)} 
            type='text' 
            placeholder='Search Products' 
            className='w-66 pl-11.75 input' />

            <img src={Search} alt="" className='absolute top-[50%] translate-y-[-50%] left-4' />
            {
                (showDropdown && results.length > 0) && (
                    <div className='absolute top-[calc(100%+8px)] bg-white left-0 w-67 lg:w-87 border border-gray-100 rounded-lg shadow-xl z-999 overflow-hidden'>
                        <div className='products-container max-h-85 lg:max-h-100 overflow-y-auto'>
                            {
                                results?.map( (product) => (
                                    <div key={product?.documentId} onClick={() => handleProductClick(product)} className="flex items-center gap-3 p-3 cursor-pointer transition-colors border-b border-border last:border-0">
                                        <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden shrink-0">
                                            <img src={product?.images?.length > 0 ? domain + product.images[0].url : noImg} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-800">{product?.title}</span>
                                            <span className="text-xs text-primary font-bold">{product?.price}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ) 
            }
        </div>
    </>
  )
}
