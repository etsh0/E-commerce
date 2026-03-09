import Heart from "../assets/Heart.svg"
import { Badge } from "./Badge";
import { domain, useDrawerStore } from "../store";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({product}) => {


    const {openSideCart} = useDrawerStore()
    const navigate = useNavigate()

    const handleCardClick = () => {
        navigate(`/shop/product-details/${product.documentId}`);
    }

    const handleAddtoCart = (e) => {
        e.stopPropagation()
        openSideCart()
    }

  return (
    <>
        <div onClick={handleCardClick} className="productCard py-4 px-2 cursor-pointer group">
            <div className="image relative bg-secondary flex items-center justify-center rounded overflow-hidden aspect-4/5">
                <img src={ domain + product.images[0].url} alt="product" className="w-full h-full object-contain" />
                <div onClick={handleAddtoCart} className="add-to-cart absolute bg-primary w-full h-12 -bottom-15 group-hover:bottom-0 transition-all duration-300 text-white flex items-center justify-center font-medium">
                    <button className="cursor-pointer">Add to Cart</button>
                </div>
                <div className="wishlist absolute w-12 h-12 top-0 right-0 flex items-center justify-center font-medium">
                    <img src={Heart} alt="" />
                </div>
            </div>
            <div className="product-deatils mt-6">
                <p className="text-p text-primary font-medium line-clamp-1">{product.title}</p>
                <div className="info flex items-center gap-2 mt-2">
                    <Badge title={`${product.stock_status}`} />
                    <span className="price text-[#474B57] text-h5">${product.price}</span>
                </div>
            </div>
        </div>
    </>
  )
}