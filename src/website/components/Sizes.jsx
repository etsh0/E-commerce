import { useEffect, useState } from "react"
import { domain } from "../../store"
import axios from "axios"

export const Sizes = ({product_sizes}) => {
    const [sizes, setSizes] = useState([])

    useEffect( () => {
        if(!product_sizes) {
            let url = domain + '/api/sizes'
            const fetchSizes = async () => {
                try {
                    const res = await axios.get(url)
                    setSizes(res.data.data)
                }
                catch(error) {
                    console.log(error);
                }
            }
            fetchSizes()
        }
        else {
            setSizes(product_sizes)
        }
    } ,[product_sizes])
  return (
    <div className="size">
        <div className="flex items-center flex-wrap gap-2 mt-4">
            {
                sizes?.map( (size) => (
                    <span key={size.documentId} className="px-4 py-3 border border-border rounded-lg uppercase text-xs font-medium text-text cursor-pointer">{size.size_value}</span>
                ))
            }
        </div>
    </div>
  )
}
