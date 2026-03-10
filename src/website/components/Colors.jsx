import { useEffect, useState } from "react"
import { domain, useFilterStore } from "../../store"
import axios from "axios"

export const Colors = ({product_colors}) => {
    const [colors , setColors] = useState([])
    const {selectedColors, setSelectedColors} = useFilterStore()
    useEffect( () => {
        if(!product_colors) {
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
    } ,[product_colors])
  return (
    <div className="colors">
        <div className="flex items-center flex-wrap gap-4 mt-4">
            {
                colors?.map( (color) => {

                    const isSelected = selectedColors.includes(color.slug)

                    return (
                    <div onClick={() => setSelectedColors(color.slug)} key={color.documentId} className={`p-1 rounded-full cursor-pointer ${isSelected && "border"}`}>
                        <div style={{ backgroundColor: color.hex_code }} className={`circle w-6 h-6 rounded-full`}></div>
                    </div>
                )
                })
            }
        </div>  
    </div>
  )
}
