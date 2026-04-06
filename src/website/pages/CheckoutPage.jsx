import logo from "../../assets/logo.svg"
import { useNavigate } from 'react-router-dom';
import { domain, useAuthStore, useCartStore } from '../../store';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { BsQuestionCircle } from 'react-icons/bs';
import axios from "axios";
import { useEffect, useState } from "react";
import noImg from "../../assets/noImg.png"
import { Spinner } from "../../components/Spinner";



export const CheckoutPage = () => {

        const {cart, getSubTotal, shippingPrice} = useCartStore()
        const {token, user} = useAuthStore()
        const subTotal = getSubTotal()
        const navigate = useNavigate()
        const [isSubmitting, setIsSubmitting] = useState(false);

        useEffect( () => {
            if(!token) {
                navigate("/login")
                return;
            }

            if(cart.length === 0) {
                navigate("/shop")
            }
            
        } ,[token, cart])

        const initialValues = {
            firstName : '',
            lastName : '',
            address : '',
            governorate : 'Gharbia',
            country: 'Egypt',
            city : '',
            postalCode : '',
            phone : '',
        } 

        const validationSchema = Yup.object().shape({
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            address: Yup.string().required("Address is required"),
            city: Yup.string().required("City is required"),
            country: Yup.string().required("country is required"),
            governorate: Yup.string().required("Required"),
            phone: Yup.string().required("Phone is required"),
            postalCode: Yup.string(),
        });

         const handlePlaceOrder = async (values) => {
            const orderData = {
                data: {
                    ...values,
                    totalAmount: shippingPrice + subTotal,
                    cartItems: cart,
                    order_status: "pending",
                    user_id: String(user.documentId)
                }
            }
            let url = domain + '/api/orders'
            setIsSubmitting(true)
            try {
                const res = await axios.post(url, orderData, {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                })
                setIsSubmitting(false)
                navigate("/order-success" , { state: { fromCheckout: true } })
                
            } catch (error) {
                navigate("/order-faild" , { state: { fromCheckout: true } })
                console.log(error.message);
            }
         }

  return (
    <>
        <div className="max-w-300 mx-auto min-h-screen flex flex-col md:flex-row items-start gap-8 p-4 md:p-10 bg-white">
            <div className="w-full md:w-[55%] flex flex-col gap-10">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handlePlaceOrder(values)}>
                    <Form className="flex flex-col gap-8">
                        <section className="flex flex-col gap-4">
                            <h2 className="text-xl font-semibold text-gray-800">Delivery</h2>
                            
                            {/* Country Selection */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs text-gray-500">Country/Region</label>
                                <Field as="select" name="country" className="w-full p-3 border border-gray-300 rounded-md bg-gray-50">
                                    <option value="Egypt">Egypt</option>
                                </Field>
                                <ErrorMessage name="country" component="span" className="text-red-500 text-xs mt-1" />
                            </div>

                            {/* Name Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <Field 
                                        name="firstName" 
                                        placeholder="First name" 
                                        className="w-full p-3 border border-border rounded-md outline-none focus:ring-2 focus:ring-blue-500" 
                                    />
                                    <ErrorMessage name="firstName" component="span" className="text-red-500 text-xs px-1" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Field 
                                        name="lastName" 
                                        placeholder="Last name" 
                                        className="w-full p-3 border border-border rounded-md outline-none focus:ring-2 focus:ring-blue-500" 
                                    />
                                    <ErrorMessage name="lastName" component="span" className="text-red-500 text-xs px-1" />
                                </div>
                            </div>


                            {/* Address Row */}
                            <Field name="address" placeholder="Address" className="w-full p-3 border border-border rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                            <ErrorMessage name="address" component="span" className="text-red-500 text-xs mt-1" />
                            
                            {/* City & Gov Row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* City */}
                                <div className="flex flex-col gap-1">
                                    <Field name="city" placeholder="City" className="w-full p-3 border border-border rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                                    <ErrorMessage name="city" component="span" className="text-red-500 text-xs px-1" />
                                </div>

                                {/* Governorate */}
                                <div className="flex flex-col gap-1">
                                    <Field as="select" name="governorate" className="w-full p-3 border border-border rounded-md bg-white outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="Gharbia">Gharbia</option>
                                        <option value="Cairo">Cairo</option>
                                        <option value="Alexandria">Alexandria</option>
                                    </Field>
                                    <ErrorMessage name="governorate" component="span" className="text-red-500 text-xs px-1" />
                                </div>

                                {/* Postal Code */}
                                <div className="flex flex-col gap-1">
                                    <Field name="postalCode" placeholder="Postal code (optional)" className="w-full p-3 border text-sm border-border rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                                    <ErrorMessage name="postalCode" component="span" className="text-red-500 text-xs px-1" />
                                </div>
                            </div>

                            {/* Phone with Info Icon */}
                            <div className="flex flex-col gap-1 w-full">
                                <div className="relative flex items-center">
                                    <Field 
                                        name="phone" 
                                        placeholder="Phone number for order updates" 
                                        className="w-full p-3 border border-border rounded-md outline-none focus:ring-2 focus:ring-blue-500" 
                                    />
                                    <BsQuestionCircle className="absolute right-3 text-gray-400 cursor-help" />
                                </div>
                                <ErrorMessage name="phone" component="span" className="text-red-500 text-xs px-1" />
                            </div>
                    </section>
                    <button type="submit" disabled={cart.length === 0} className="disabled:bg-gray-600 disabled:cursor-not-allowed w-full bg-primary text-white p-4 rounded-md font-bold hover:bg-gray-800 transition-colors mt-4 cursor-pointer flex items-center justify-center">
                        {
                            isSubmitting ? 
                            <>
                                <Spinner />
                                <span className="ml-2">Placing Order...</span>
                            </> 
                            
                            : "Place Order"
                        }
                    </button>
                    </Form>
                </Formik>
            </div>

            <div className="w-full md:w-[45%] bg-gray-50 p-6 md:p-10 rounded-lg md:sticky md:top-10 h-fit flex flex-col gap-6">
                <div className="w-full flex justify-center items-center">
                    <img className="w-50" src={logo} alt="" />
                </div>
                <h3 className="font-semibold mb-6">Your Order</h3>
                <div className="order-container flex flex-col gap-4">
                    {
                        cart.map( (order) => (
                            <div key={order.documentId} className="order-item flex items-center justify-between">
                                <div className="flex gap-4">
                                    <div className="image shadow bg-gray-300 relative">
                                        <img className="w-17 sm:w-20 aspect-square object-contain" src={order?.images?.length > 0 ? domain + order.images[0].url : noImg} alt="" />
                                        <span className="qty absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full flex items-center justify-center">{order.qty}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm line-clamp-1">{order.title}</h4>
                                        <div className="text-xs text-text font-medium flex items-center gap-2"><div style={{ backgroundColor: order?.selectedColor }} className="select-color w-3 h-3 rounded-full"></div>{order?.selectedSize && "—"}<span className="select-size uppercase">{order?.selectedSize}</span></div>
                                    </div>
                                </div>
                                <span>{order.qty * order.price} EGP</span>
                            </div>
                        ))
                    }
                </div>
                <div className="flex flex-col gap-4 mb-4">
                    <div className="flex items-center justify-between">
                        <span className="text-text font-medium">Subtotal</span>
                        <span>{subTotal} EGP</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-text font-medium">Shipping</span>
                        <span>{cart.length > 0 ? shippingPrice : 0} EGP</span>
                    </div>
                </div>
                <div className="pt-6 border-t-2 border-border">
                    <div className="flex items-center justify-between">
                        <span>Total</span>
                        <span>{cart.length > 0 ? shippingPrice + subTotal : 0} EGP</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
