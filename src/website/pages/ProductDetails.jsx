import img from "../../assets/T-Shirt.svg"
import Share from "../../assets/Share.svg"
import More from "../../assets/More.svg"
import EmptyStar from "../../assets/Empty Star.svg"
import { FaStar } from "react-icons/fa"
import { Badge } from "../../components/Badge"
import { Colors } from "../components/Colors"
import { Sizes } from "../components/Sizes"
import { Quantity } from "../components/Quantity"
import { IoMdHeartEmpty } from "react-icons/io"
import { Link, NavLink, Outlet } from "react-router-dom"
import { ProductCard } from "../../components/ProductCard"
import { NewsLetter } from "../../components/NewsLetter"

export const ProductDetails = () => {
  return (
    <>
        <div className="container mt-6">
            <div className="flex gap-25">
                <div className="product-images bg-secondary w-133 h-143 flex items-center justify-center">
                    <img className="w-100" src={img} alt="" />
                </div>
                <div className="product-info grow">
                    <div className="flex items-center justify-between">
                        <h3 className="text-h3 font-semibold">Raw Black T-Shirt Lineup</h3>
                        <img className="w-7.5 cursor-pointer" src={Share} alt="" />
                    </div>
                    <div className="badges mt-3.5 flex items-center gap-4">
                        <div className="bg-secondary px-4 py-1 rounded-2xl text-[12px] font-medium w-fit text-text flex items-center gap-2">
                           <FaStar />
                            4.2 — 54 Reviews 
                        </div>
                        <Badge title={"In Stock"} />
                    </div>
                    <div className="price font-semibold text-primary mt-6 text-h4">$75.00</div>
                    <div className="colors mt-8">
                        <h4 className="text-[12px] text-text uppercase font-medium">Available Colors</h4>
                        <Colors />      
                    </div>
                    <div className="sizes mt-6">
                        <h4 className="text-[12px] text-text uppercase font-medium">Selected Size</h4>
                        <Sizes />
                    </div>
                    <div className="qty mt-6">
                        <h4 className="text-[12px] text-text uppercase font-medium">Quantity</h4>
                        <Quantity />
                    </div>
                    <div className="add-to-cart mt-8 flex items-center gap-4">
                        <button className="bg-primary flex items-center justify-center text-white px-40 py-2 rounded cursor-pointer">Add to cart</button>
                        <div className="wishlist border-2 border-border px-2 py-2 rounded cursor-pointer">
                            <IoMdHeartEmpty size={"22px"} />
                        </div>
                    </div>
                    <p className="text-text text-sm mt-4">— Free shipping on orders $100+</p>
                </div>
            </div>
            <div className="py-30 flex gap-10">
                <div className="side flex flex-col gap-4 w-55">
                    <NavLink to={""} end className={({isActive}) => `flex items-center gap-4 px-4 py-1 rounded ${isActive ? "bg-secondary" : ""}`}>
                        <img src={More} alt="" />
                        <span className="text-sm font-medium">Details</span>
                    </NavLink>
                    <NavLink to={"reviews"} className={({isActive}) => `flex items-center gap-4 px-4 py-1 rounded ${isActive ? "bg-secondary" : ""}`}>
                        <img src={EmptyStar} alt="" />
                        <span className="text-sm font-medium">Reviews</span>
                    </NavLink>
                </div>
                <div className="grow">
                    <Outlet />
                </div>
            </div>
            <div className="pb-30">
                <h4 className="text-2xl font-semibold mb-2">You might also like</h4>
                <p className="text-xs text-text">SIMILAR PRODUCTS</p>
                <div className="products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-10">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </div>
        <NewsLetter />
    </>
  )
}
