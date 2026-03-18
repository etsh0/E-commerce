import { useEffect } from 'react';
import { BiXCircle } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';


export const OrderFailed = () => {
    const navigate = useNavigate();
    const location = useLocation();

const isAuthorized = location.state?.fromCheckout;

    useEffect(() => {
        if (!isAuthorized) {
            navigate("/", { replace: true });
        }
    }, [isAuthorized, navigate]);

    if (!isAuthorized) return null;

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <div className="mb-6 text-red-500">
                <BiXCircle size={80} strokeWidth={1.5} />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Order Failed! 
            </h1>
            
            <p className="text-gray-600 mb-8 max-w-md">
                Something went wrong while processing your order. 
                Please check your payment details and try again.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <button 
                    onClick={() => navigate('/checkout')}
                    className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all"
                >
                    Try Again
                </button>

                <button 
                    onClick={() => navigate('/shop')}
                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all"
                >
                    Continue Shopping
                </button>
            </div>
            
            <p className="mt-8 text-sm text-gray-400">
                If the problem persists, please contact our support team.
            </p>
        </div>
    );
};
