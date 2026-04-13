import More from "../../assets/More.svg"
import EmptyStar from "../../assets/Empty Star.svg"
import { FaStar } from "react-icons/fa"
import { Badge } from "../../components/Badge"
import { Colors } from "../components/Colors"
import { Sizes } from "../components/Sizes"
import { Quantity } from "../components/Quantity"
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io"
import { NavLink, Outlet, useParams } from "react-router-dom"
import { NewsLetter } from "../../components/NewsLetter"
import { ImgSwiper } from "../../components/ImgSwiper"
import { domain, useCartStore, useDrawerStore, useFilterStore, useReviewsCounter, useWishlistStore } from "../../store"
import { useEffect, useState } from "react"
import axios from "axios"
import { ProductCard } from "../../components/ProductCard"
import { Spinner } from "../../components/Spinner"
import { toast } from "sonner"
import { getFinalPrice } from "../../utils/PriceUtils"

export const ProductDetails = () => {
    const params = useParams()
    const [product ,setProduct] = useState([])
    const {resetProductSelection, productSize, color_hex_code} = useFilterStore()
    const {openSideCart} = useDrawerStore()
    const {setAddToCart} = useCartStore()
    const [qty , setQty] = useState(1)
    const {wishList, setAddToWishList} = useWishlistStore()
    const {reviewsCount, setReviewsCount} = useReviewsCounter()
    const [similarProducts, setSimilarProducts] = useState()
    // const {setLoading} = useUiStore()
    const [isAdding, setIsAdding] = useState(false);
    const [isWishloading, setIsWishLoading] = useState(false);

    const isInwishList = wishList.some( (item) => item.id === product.id)

    useEffect(() => {
        let productId = params.productId
        let endPoint = '/api/products/' + productId
        let url = domain + endPoint

        const fetchProducts = async () => {
            try {
                const res = await axios.get(url,{
                    params:{
                        populate:'*'
                    }
                })
                const currentProduct = res.data.data                
                setProduct(currentProduct)
                setReviewsCount(res.data.data.reviews?.length)

                if(currentProduct.category.slug) {
                    fetchSimilarProducts(currentProduct.category.slug , currentProduct.id)
                }
            }
            catch(error) {
                console.log(error);
            }
        }

        const fetchSimilarProducts = async (categorySlug , currentProductId) => {
            try {
                const res = await axios.get(`${domain}/api/products`, {
                    params: {
                        populate: '*',
                        filters: {
                            category: {
                                slug: {
                                    $eq: categorySlug
                                }
                            },
                            id : {
                                $ne: currentProductId
                            }
                        },
                        pagination: {
                            limit: 4
                        }
                    }
                })
                setSimilarProducts(res.data.data) 
            } 
            catch (error) {
                console.log(error);
            }
        }

        resetProductSelection()
        fetchProducts()
    } ,[params.productId])

    const handleAddToCart = () => {
        
        const hasSizes = product.sizes && product.sizes.length > 0;
        const hasColors = product.colors && product.colors.length > 0;

        if( (!productSize && hasSizes) || (!color_hex_code && hasColors)) {
            toast.error("Please select size and color first!");
            return;
        }

        setIsAdding(true)

        setTimeout(() => {
            setAddToCart(product, productSize, color_hex_code, qty);
            setQty(1);
            resetProductSelection();

            setIsAdding(false);     
            openSideCart();
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

    const finalPrice = getFinalPrice(product.price, product.discount)

  return (
    <>
        <div className="container mt-6">
            <div data-aos="fade-down" data-aos-duration="1000" className="flex flex-col lg:flex-row gap-15">
                <div className="product-images relative bg-secondary w-full lg:w-130 flex items-center justify-center">
                    <ImgSwiper product_images={product.images} />
                    {
                        product?.discount > 0 && (
                            <span className="absolute top-3 left-2 bg-red-500 px-3 py-0.5 text-xs text-white tracking-wider uppercase z-1">Save {product?.discount}%</span>
                        )
                    }
                </div>
                <div className="product-info grow">
                    <div className="flex items-center justify-between">
                        <h3 className="text-h4 sm:text-h3 font-semibold">{product.title}</h3>
                    </div>
                    <div className="badges mt-3.5 flex items-center gap-4">
                        <div className="bg-secondary px-4 py-1 rounded-2xl text-[12px] font-medium w-fit text-text flex items-center gap-2">
                           <FaStar />
                            {product.rate} — {reviewsCount} Reviews 
                        </div>
                        <Badge title={`${product.stock_status}`} />
                    </div>
                    <div className="flex items-center gap-3 mt-6">
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
                    <div className={`colors mt-8 ${product?.colors?.length === 0 && "hidden"}`}>
                        <h4 className="text-[12px] text-text uppercase font-medium">Available Colors</h4>
                        <Colors product_colors={product.colors} />      
                    </div>
                    <div className={`sizes mt-6 ${product?.sizes?.length === 0 && "hidden"}`}>
                        <h4 className="text-[12px] text-text uppercase font-medium">Selected Size</h4>
                        <Sizes product_sizes={product.sizes} />
                    </div>
                    <div className="qty mt-6">
                        <h4 className="text-[12px] text-text uppercase font-medium mb-4">Quantity</h4>
                        <Quantity qty={qty} Increment={() => setQty( q => q + 1)} Decrement={() => setQty(Math.max(1, qty - 1))}/>   
                    </div>
                    <div className="add-to-cart mt-8 flex items-center gap-4">
                        <button onClick={() => {handleAddToCart()}}  className={`${isAdding ? "bg-primary/80" : "bg-primary"} flex items-center justify-center btn-animate bg-primary text-white md:before:bg-white md:hover:text-primary px-15 sm:px-30 lg:px-40 py-2 cursor-pointer whitespace-nowrap`}>
                            {
                                isAdding ? 
                                <>
                                    <Spinner />
                                    <span className="ml-2">Adding...</span>
                                </> 
                                
                                : <span>Add to Cart</span>
                            }
                        </button>

                        <div onClick={() => handleAddToWishList(product)} className="wishlist border-2 border-border px-2 py-2 rounded cursor-pointer flex items-center justify-center min-w-10 min-h-10">
   
                            {!isWishloading && (
                                isInwishList ? <IoMdHeart className="text-primary" size={"22px"} /> : <IoMdHeartEmpty size={"22px"} />
                            )}

                            {isWishloading && <Spinner className="text-primary" />}
                        </div>
                    </div>
                    <p className="text-text text-sm mt-4">— Free shipping on orders 100+</p>
                </div>
            </div>
            <div className="py-30 flex flex-col md:flex-row gap-10">
                <div className="side flex md:flex-col gap-4 w-55">
                    <NavLink to={""} end className={({isActive}) => `hover:bg-secondary transition-colors duration-200 flex items-center gap-2 md:gap-4 md:px-4 px-2 py-1 rounded ${isActive ? "bg-secondary" : ""}`}>
                        <img src={More} alt="" />
                        <span className="text-xs sm:text-sm font-medium">Details</span>
                    </NavLink>
                    <NavLink to={"reviews"} className={({isActive}) => `hover:bg-secondary transition-colors duration-200 flex items-center gap-2 md:gap-4 md:px-4 px-2 py-1 rounded ${isActive ? "bg-secondary" : ""}`}>
                        <img src={EmptyStar} alt="" />
                        <span className="text-xs sm:text-sm font-medium">Reviews</span>
                    </NavLink>
                </div>
                <div className="grow">
                    <Outlet context={{
                        details: product?.details,
                        rate: product.rate,
                        productId: product?.documentId
                    }} />
                </div>
            </div>
            <div className="pb-30">
                <h4 className="text-2xl font-semibold mb-2">You might also like</h4>
                <p className="text-xs text-text">SIMILAR PRODUCTS</p>
                <div className="products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-10">
                    {
                        similarProducts?.map( (product) => (
                            <ProductCard key={product.documentId} product={product}/>
                        ))
                    }
                </div>
            </div>
        </div>
        <NewsLetter />
    </>
  )
}
