import logo from "../assets/logo.svg"

export const GlobalLoader = () => {
  return (
    <>
        <img className="w-40 " src={logo} alt="" />
        <div className="w-28 h-1 bg-gray-300 rounded-2xl mt-4 relative overflow-hidden">
            <span className="w-12 h-full bg-primary absolute rounded-2xl animate-global-loading"></span>
        </div>
    </> 
  )
}

// - when we start the app  (opactiy = 100%)
// - when we click on product details page (opactiy = 100%)

// - when we click on login or register page
// - when we click on account details, orders, wishlist or password page
// - when we click on checkout page