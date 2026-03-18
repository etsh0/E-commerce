import { BsCheckCircleFill } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store';
import { useEffect } from 'react';

export const OrderSuccess = () => {
    const {clearCart} = useCartStore()
    const navigate = useNavigate()
    const location = useLocation()
    const isAuthorized = location.state?.fromCheckout;

    useEffect(() => {
        if (!isAuthorized) {
            navigate("/", { replace: true });
        } else {
            clearCart();
        }

    }, [isAuthorized, navigate, clearCart]);

    if (!isAuthorized) return null;
    
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">

      <div className="bg-green-50 p-4 rounded-full mb-6">
        <BsCheckCircleFill className="text-green-500 text-6xl shadow-lg rounded-full" />
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank you for your order!</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        Your order has been placed successfully. We'll send you a confirmation email with order details and tracking information.
      </p>


      <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 mb-8 w-full max-w-md">
        <div className="flex justify-between">
          <span className="text-gray-400">Estimated Delivery:</span>
          <span className="font-semibold text-gray-800">2-3 Business Days</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/shop" 
          className="bg-black text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-all"
        >
          Continue Shopping
        </Link>
        <Link 
          to="/account" 
          className="border border-gray-300 px-8 py-3 rounded-md font-semibold hover:bg-gray-50 transition-all"
        >
          Track My Order
        </Link>
      </div>
    </div>
  )
}
