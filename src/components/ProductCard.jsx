import { Badge } from "./Badge";
import { domain, useDrawerStore, useUiStore } from "../store";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import noImg from "../assets/noImg.png"



export const ProductCard = ({product}) => {


    const navigate = useNavigate()
    const {openProductModal} = useDrawerStore()
    const {setLoading} = useUiStore()

    const handleCardClick = () => {
        setLoading("isAppLoading", true)
        navigate(`/shop/product-details/${product.documentId}`);
    }

    const handleAddtoCart = (e,product) => {
        e.stopPropagation()
        openProductModal(product)
    }

  return (
    <>
        <div onClick={handleCardClick} className="productCard py-4 px-2 cursor-pointer group/card">
            <div className="image relative bg-secondary flex items-center justify-center rounded overflow-hidden aspect-4/5">
                <img src={ product?.images?.length > 0  ? domain + product.images[0].url : noImg} alt="product" className="w-full h-full object-cover" />
                <div onClick={(e) => handleAddtoCart(e,product)} className="add-to-cart group absolute bg-white w-8 h-8 lg:w-10 lg:h-10 bottom-2 right-2 opacity-100 lg:-bottom-15 lg:group-hover/card:bottom-2 transition-all duration-300 text-black flex items-center justify-center font-medium">
                    <button className="cursor-pointer transition-transform duration-300 group-hover:rotate-90"><FiPlus size={"18"} /></button>
                </div>
            </div>
            <div className="product-deatils mt-6">
                <p className="text-p text-primary font-medium line-clamp-1">{product.title}</p>
                <div className="info flex items-center gap-2 mt-2">
                    <Badge title={`${product.stock_status}`} />
                    <span className="price text-[#474B57] text-h5">{product.price} EGP</span>
                </div>
            </div>
        </div>
    </>
  )
}