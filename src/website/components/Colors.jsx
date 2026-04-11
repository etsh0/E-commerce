import { useEffect, useState } from "react"
import { domain, useFilterStore } from "../../store"
import axios from "axios"

export const Colors = ({product_colors}) => {
    const [colors , setColors] = useState([])
    const {selectedColors, setSelectedColors , productColor, setProductColor} = useFilterStore()

    const isProductPage = !!product_colors

    useEffect( () => {
        if(!isProductPage) {
            const fetchColors = async () => {
                let url = domain + "/api/colors"
                try{
                    const res = await axios.get(url)
                    setColors(res.data.data)
                }
                catch(error) {
                    console.log(error);
                }
            }
            fetchColors() 
        }
        else {
            setColors(product_colors)
        }
    } ,[product_colors, isProductPage])
    
  return (
    <div className="colors">
        <div className="flex items-center flex-wrap gap-4 mt-4">
            {
                colors?.map( (color) => {

                    const isSelected = isProductPage ? productColor === color.slug : selectedColors.includes(color.slug)

                    return (
                    <div onClick={() => isProductPage ? setProductColor(color.slug , color.hex_code) : setSelectedColors(color.slug)} key={color.documentId} className={`relative p-1 rounded-full cursor-pointer group transition-all duration-200 ${isSelected ? "border border-primary" : "border border-transparent"}`}>
                        <div style={{ backgroundColor: color.hex_code }} className={`circle w-6 h-6 rounded-full`}></div>
                        <span className="color-name absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white px-2 py-0.5 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{color.slug}</span>
                    </div>
                )
                })
            }
        </div>  
    </div>
  )
}
