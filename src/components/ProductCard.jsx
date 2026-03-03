import { useNavigate } from "react-router-dom";
import Tshirt from "../assets/تصميم بدون عنوان.svg";
import Heart from "../assets/Heart.svg"
import { Badge } from "./Badge";
import { useDrawerStore } from "../store";

export const ProductCard = () => {
    const navigate = useNavigate()
    const handleCardClick = () => {
        navigate('/shop/Basic-Tees')
    }

    const {openSideCart} = useDrawerStore()

    const handleAddtoCart = (e) => {
        e.stopPropagation()
        openSideCart()
    }
  return (
    <>
        <div className="productCard py-4 px-2 cursor-pointer group" onClick={handleCardClick}>
            <div className="image relative bg-secondary flex items-center justify-center rounded overflow-hidden aspect-4/5">
                <img src={Tshirt} alt="product" className="w-full h-full object-contain" />
                <div className="add-to-cart absolute bg-primary w-full h-12 -bottom-15 group-hover:bottom-0 transition-all duration-300 text-white flex items-center justify-center font-medium"  onClick={handleAddtoCart}>
                    <button className="cursor-pointer">Add to Cart</button>
                </div>
                <div className="wishlist absolute w-12 h-12 top-0 right-0 flex items-center justify-center font-medium">
                    <img src={Heart} alt="" />
                </div>
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