import { FaStar } from "react-icons/fa"
import { AiOutlineClose } from "react-icons/ai";
import { ImgSwiper } from "../../../components/ImgSwiper"
import Badge from "@mui/material/Badge"
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io"
import { Quantity } from "../Quantity"
import { useCartStore, useDrawerStore, useFilterStore, useWishlistStore } from "../../../store"
import { Link, useNavigate } from "react-router-dom";
import { Colors } from "../Colors";
import { Sizes } from "../Sizes";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../../../components/Spinner";


export const ProductModal = () => {
    const {openSideCart, closeProductModal, selectedProduct} = useDrawerStore()
    const {resetProductSelection, productSize, color_hex_code} = useFilterStore()
    const navigate = useNavigate()
    const {setAddToCart} = useCartStore()
    const [qty , setQty] = useState(1)
    const {wishList, setAddToWishList} = useWishlistStore()
    const [isAdding, setIsAdding] = useState(false);
    const [isWishloading, setIsWishLoading] = useState(false);
    

    if (!selectedProduct) return null;

    const isInwishList = wishList.some( (item) => item.id === selectedProduct.id) // return true or false

    const handleCardClick = () => {
        navigate(`/shop/product-details/${selectedProduct.documentId}`);
        closeProductModal()
    }

    const handleAddToCart = () => {

        const hasSizes = selectedProduct.sizes && selectedProduct.sizes.length > 0;
        const hasColors = selectedProduct.colors && selectedProduct.colors.length > 0;

        if( (!productSize && hasSizes) || (!color_hex_code && hasColors)) {
            toast.error("Please select size and color first!");
            return;
        }

        setIsAdding(true)

        setTimeout(() => {
            setAddToCart( selectedProduct , productSize, color_hex_code, qty)        
            setQty(1)
            resetProductSelection()

            setIsAdding(false); 

            closeProductModal()
            openSideCart()
            toast.success("Product added to cart!");
        }, 500);
        
    }

    const handleAddToWishList = (product) => {
        setIsWishLoading(true)

        setTimeout( () => {
            setIsWishLoading(false)
            setAddToWishList(product)
        }, 500)
    }

  return (
    <>
        <div className="flex flex-col lg:flex-row gap-6 ">
            <button onClick={() => {
                closeProductModal()
                resetProductSelection()
                }}  className="cursor-pointer flex self-end lg:hidden"><AiOutlineClose size={"18"} />
            </button>
            <div className="product-images bg-secondary w-full lg:w-80 flex items-center justify-center aspect-square">
                <ImgSwiper product_images={selectedProduct.images} />
            </div>
            <div className="product-info grow">
                <div className="flex items-center justify-between">
                    <h3 className="text-h4 sm:text-h3 font-semibold">{selectedProduct.title}</h3>
                    <button onClick={() => {
                        closeProductModal()
                        resetProductSelection()
                        }}  className="cursor-pointer hidden lg:block"><AiOutlineClose size={"18"} />
                    </button>
                </div>
                <div className="badges mt-3.5 flex items-center gap-4">
                    <div className="bg-secondary px-4 py-1 rounded-2xl text-[12px] font-medium w-fit text-text flex items-center gap-2">
                        <FaStar />
                        {selectedProduct.rate} — {selectedProduct.reviews_count} Reviews 
                    </div>
                    <Badge title={"In Stock"} />
                </div>
                <div className="price font-semibold text-primary mt-6 text-xl">${selectedProduct.price}</div>
                <div className={`colors mt-8 ${selectedProduct?.colors?.length === 0 && "hidden"}`}>
                    <h4 className="text-[12px] text-text uppercase font-medium">Available Colors</h4>
                    <Colors product_colors={selectedProduct.colors} />      
                </div>
                <div className={`sizes mt-6 ${selectedProduct?.sizes?.length === 0 && "hidden"}`}>
                    <h4 className="text-[12px] text-text uppercase font-medium">Selected Size</h4>
                    <Sizes product_sizes={selectedProduct.sizes} />
                </div>
                <div className="qty mt-6">
                    <h4 className="text-[12px] text-text uppercase font-medium mb-4">Quantity</h4>
                    <Quantity qty={qty} Increment={() => setQty( q => q + 1)} Decrement={() => setQty(Math.max(1, qty - 1))}/> 
                </div>
                <div className="add-to-cart mt-8 flex items-center gap-4">
                    <button onClick={handleAddToCart} className={`${isAdding ? "bg-primary/80" : "bg-primary"} flex items-center justify-center text-white px-15 sm:px-30 lg:px-40 py-2 rounded cursor-pointer whitespace-nowrap`}>
                            {
                                isAdding ? 
                                <>
                                    <Spinner />
                                    <span className="ml-2">Adding...</span>
                                </> 
                                
                                : "Add to Cart"
                            }
                    </button>
                    <div onClick={() => handleAddToWishList(selectedProduct)} className={`wishlist border-2 border-border px-2 py-2 rounded cursor-pointer flex items-center justify-center min-w-10 min-h-10`}>

                        {!isWishloading && (
                            isInwishList ? <IoMdHeart className="text-primary" size={"22px"} /> : <IoMdHeartEmpty size={"22px"} />
                        )}

                        {isWishloading && <Spinner className="text-primary" />}
                    </div>
                </div>
                <p className="text-text text-sm mt-4">— Free shipping on orders $100+</p>
            </div>
        </div>
        <div onClick={handleCardClick} className="flex items-center justify-center mt-8 ">
            <button className="text-sm font-medium w-full text-primary underline text-center cursor-pointer">View Details</button>
        </div>
    </>
  )
}
