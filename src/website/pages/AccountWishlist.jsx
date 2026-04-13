import { Link } from "react-router-dom"
import { AccountHeader } from "../components/AccountHeader"
import { domain, useWishlistStore } from "../../store"
import noImg from "../../assets/noImg.png"

export const AccountWishlist = () => {
    const {wishList, removeWishListItem} = useWishlistStore()
    // const {setLoading} = useUiStore()
  return (
    <>
        <div className="">
            <AccountHeader title={"My Wishlist"} />
            <div className="orders-container overflow-auto flex flex-col gap-6">
                {/* wishlist item */}
                {
                    wishList.length === 0 ? 
                    (
                    
                        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                            <p className="text-xl text-primary mb-6">Your empty wishlist awaits. Fill it with your dreams</p>
                            <Link to="/shop" className="btn-animate bg-primary text-white md:before:bg-white md:hover:text-primary">
                                <span>Explore Products</span>
                            </Link>
                        </div>
                    ) 
                        : 
                    (
                        wishList?.map( (product,idx) => (
                            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay={idx * 100} key={product.documentId} className="order-item flex flex-col sm:flex-row gap-4 justify-between border-b-2 border-border pb-4">
                                <div className="flex items-center gap-4">
                                    <div className="image bg-secondary">
                                        <img className="aspect-square w-17 md:w-20 object-contain" src={product?.images?.length > 0 ? domain + product.images[0].url : noImg} alt="" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-xs md:text-sm font-medium text-primary line-clamp-1">{product.title}</h3>
                                        <button onClick={() => removeWishListItem(product)} className="text-red-500 w-fit self-start font-medium text-xs cursor-pointer">Remove item</button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-6">
                                    <span className="font-medium">${product.price}</span>
                                    <Link to={`/shop/product-details/${product.documentId}`}>
                                        <button className="text-[10px] sm:text-xs py-2 px-3 font-semibold whitespace-nowrap btn-animate bg-white text-primary md:before:bg-primary md:hover:text-white">
                                            <span>View Product</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    </>
  )
}
