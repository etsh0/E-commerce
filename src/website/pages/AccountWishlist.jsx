import { Link } from "react-router-dom"
import { AccountHeader } from "../components/AccountHeader"
import { domain, useWishlistStore } from "../../store"

export const AccountWishlist = () => {
    const {wishList, removeWishListItem} = useWishlistStore()
  return (
    <>
        <div className="">
            <AccountHeader title={"My Wishlist"} />
            <div className="orders-container overflow-auto flex flex-col gap-6">
                {/* wishlist item */}
                {
                    wishList.length === 0 ? (<div className="text-center text-text uppercase my-auto">Your Wishlist is empty</div>) : (
                        wishList?.map( (product) => (
                            <div key={product.documentId} className="order-item flex flex-col sm:flex-row gap-4 justify-between border-b-2 border-border pb-4">
                                <div className="flex items-center gap-4">
                                    <div className="image bg-secondary">
                                        <img className="aspect-square w-17 md:w-20 object-contain" src={domain + product.images[0].url} alt="" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-xs md:text-sm font-medium text-primary line-clamp-1">{product.title}</h3>
                                        <button onClick={() => removeWishListItem(product)} className="text-red-500 w-fit self-start font-medium text-xs cursor-pointer">Remove item</button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-6">
                                    <span className="font-medium">${product.price}</span>
                                    <Link to={`/shop/product-details/${product.documentId}`}>
                                        <button className="text-primary text-xs sm:text-sm border border-primary py-2 px-4 rounded font-semibold hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer whitespace-nowrap">View Item</button>
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
