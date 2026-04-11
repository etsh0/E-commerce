import { Badge } from "./Badge";
import { domain, useDrawerStore, useUiStore } from "../store";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import noImg from "../assets/noImg.png"
import { getFinalPrice } from "../utils/PriceUtils";




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

    const finalPrice = getFinalPrice(product.price, product.discount)

  return (
    <>
        <div onClick={handleCardClick} className="productCard py-4 px-2 cursor-pointer group/card">
            <div className="image relative group/card bg-secondary flex items-center justify-center rounded overflow-hidden aspect-4/5">
                {
                    product?.discount > 0 && (
                        <span className="absolute top-3 left-2 bg-red-500 px-3 py-0.5 text-xs text-white tracking-wider uppercase z-1">Save {product?.discount}%</span>
                    )
                }

                <img src={ product?.images?.length > 0  ? domain + product.images[0].url : noImg} alt="product" className={`w-full h-full object-cover ${product?.images?.length > 1 && "group-hover/card:opacity-0"} duration-300 transition-opacity`} />
                {
                    product?.images?.length > 1 && (
                        <img src={ domain + product.images[1].url } alt="" className={"absolute w-full h-full object-cover opacity-0 group-hover/card:opacity-100 duration-300 transition-opacity"} />
                    )
                }                
                <div onClick={(e) => handleAddtoCart(e,product)} className="add-to-cart group absolute bg-white w-8 h-8 lg:w-10 lg:h-10 bottom-2 right-2 opacity-100 lg:-bottom-15 lg:group-hover/card:bottom-2 transition-all duration-300 text-black flex items-center justify-center font-medium">
                    <button className="cursor-pointer transition-transform duration-300 group-hover:rotate-90"><FiPlus size={"18"} /></button>
                </div>
            </div>
            <div className="product-deatils mt-6 text-center">
                <p className="text-p text-primary font-medium uppercase line-clamp-1">{product.title}</p>

                <div className="flex items-center justify-center gap-3 mt-6">
                    <span className={`font-semibold ${product.discount ? "text-red-500" : "text-primary"}`}>
                         {finalPrice} EGP
                    </span>
                    {product.discount > 0 && (
                        <>
                            <span className="text-primary font-semibold line-through opacity-50">
                                 {product.price} EGP
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    </>
  )
}