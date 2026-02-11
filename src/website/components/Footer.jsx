import Logo from '../../assets/footer_logo.svg'
import Github from '../../assets/Github.svg'
import Instagram from '../../assets/Instagram.svg'
import Youtube from '../../assets/Youtube.svg'
import Mastercard from '../../assets/Mastercard.svg'
import Visa from '../../assets/Visa.svg'
import Amex from '../../assets/Amex.svg'

export const Footer = () => {
  return (
    <>
        <footer className='container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15 md:gap-20 pt-20 pb-10'>
            <div className="">
                <img src={Logo} alt="" />
                <p className='text-text text-sm mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod.</p>
                <div className="social flex items-center gap-6 mt-8">
                    <img src={Github} alt="" />
                    <img src={Instagram} alt="" />
                    <img src={Youtube} alt="" />
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-18">
                <div className="support">
                  <h3 className='mb-10 text-[#878A92] text-sm font-medium'>Support</h3>
                  <ul className='links flex flex-col gap-4 text-sm text-text'>
                    <li>FAQ</li>
                    <li>Terms of use</li>
                    <li>Privacy Policy</li>
                  </ul>
                </div>
                <div className="company">
                  <h3 className='mb-10 text-[#878A92] text-sm font-medium'>COMPANY</h3>
                  <ul className='links flex flex-col gap-4 text-sm text-text'>
                    <li>About us</li>
                    <li>Contact</li>
                    <li>Craeers</li>
                  </ul>
                </div>
                <div className="shop">
                  <h3 className='mb-10 text-[#878A92] text-sm font-medium'>SHOP</h3>
                  <ul className='links flex flex-col gap-4 text-sm text-text'>
                    <li>My Account</li>
                    <li>Checkout</li>
                    <li>Cart</li>
                  </ul>
                </div>
            </div>
            <div className="">
              <h3 className='mb-10 text-[#878A92] text-sm font-medium'>ACCEPTED PAYMENTS</h3>
              <div className="payments flex items-center gap-6">
                <img src={Mastercard} alt="" />
                <img src={Visa} alt="" />
                <img src={Amex} alt="" /> 
              </div>
            </div>
        </footer>
        <div className='border-t border-border'>
            <p className='text-center text-sm text-text py-6.75'>Copyright © 2026. All rights reserved.</p>
        </div>
    </>
  )
}
