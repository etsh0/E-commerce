import { useNavigate } from "react-router-dom";
import Tshirt from "../assets/تصميم بدون عنوان.svg";
import { Badge } from "./Badge";

export const ProductCard = () => {
    const navigate = useNavigate()
    const handleCardClick = () => {
        navigate('/shop/Basic-Tees')

        // e.stopPropagation() 
    }
  return (
    <>
        <div className="productCard py-4 px-2 cursor-pointer" onClick={handleCardClick}>
            <div className="image bg-secondary flex items-center justify-center rounded overflow-hidden aspect-4/5">
                <img src={Tshirt} alt="product" className="w-full h-full object-contain" />
            </div>
            <div className="product-deatils mt-6">
                <p className="text-p text-primary font-medium line-clamp-1">Classic Monochrome Tees</p>
                <div className="info flex items-center gap-2 mt-2">
                    <Badge title={"In Stock"} />
                    <span className="price text-[#474B57] text-h5">$29.99</span>
                </div>
            </div>
        </div>
    </>
  )
}