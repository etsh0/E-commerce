import { useEffect, useState } from "react"
import { domain, useFilterStore } from "../../store"
import axios from "axios"

export const Sizes = ({product_sizes}) => {
    const [sizes, setSizes] = useState([])
    const {selectedSizes, setSelectedSizes, productSize, setProductSize} = useFilterStore()

    const isProductPage = !!product_sizes

    useEffect( () => {
        if(!isProductPage) {
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
    } ,[product_sizes, isProductPage])
  return (
    <div className="size">
        <div className="flex items-center flex-wrap gap-2 mt-4">
            {
                sizes?.map( (size) => {
                    const isSelected = isProductPage ? productSize === size.slug : selectedSizes.includes(size.slug)
                    return (
                    <span onClick={() => isProductPage ? setProductSize(size.slug)  : setSelectedSizes(size.slug)} key={size.documentId} className={`px-4 py-3 border border-border rounded-lg uppercase text-xs font-medium text-text cursor-pointer ${isSelected && "bg-primary text-white"}`}>{size.size_value}</span>
                )
                })
            }
        </div>
    </div>
  )
}
