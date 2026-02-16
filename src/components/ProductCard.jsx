import { useNavigate } from "react-router-dom";
import Tshirt from "../assets/تصميم بدون عنوان.svg";
import { Badge } from "./Badge";

export const ProductCard = () => {
    const navigate = useNavigate()
    const handleCardClick = () => {
        navigate('/shop/Basic-Tees')
    }
  return (
    <>
        <div className="productCard py-4 px-2 cursor-pointer" onClick={handleCardClick}>
            <div className="image bg-secondary flex items-center justify-center pb-10 rounded">
                <img src={Tshirt} alt="" />
            </div>
            <div className="product-deatils mt-6">
                <p className="text-p text-primary font-medium">Classic Monochrome Tees</p>
                <div className="info flex items-center gap-2 mt-2">
                    <Badge title={"In Stock"} />
                    <span className="price text-[#474B57] text-[14px]">$29.99</span>
                </div>
            </div>
        </div>
    </>
  )
}