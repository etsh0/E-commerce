import { Link } from "react-router-dom"

export const NotificationBar = () => {
  return (
    <div className='w-full py-2 bg-primary text-white text-center text-xs md:text-sm'>
        <div>Get 25% OFF on your first order. <Link to={"/shop"}>Order Now</Link></div>
    </div>
  )
}
