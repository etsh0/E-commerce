import { Link, useNavigate } from "react-router-dom"
import Google from "../../../assets/Google.svg"
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { domain, useAuthStore, useCartStore, useWishlistStore } from './../../../store/index';
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Spinner } from "../../../components/Spinner";

export const Register = () => {

    const {login , token} = useAuthStore()
    const {clearWishList} = useWishlistStore()
    const {clearCart} = useCartStore()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        username : "",
        email : "" ,
        password : ""
    }

    const validationSchema = Yup.object({
        username: Yup.string().required("Username is required"),
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required")
    });

    const handleRegister = async (values) => {

        setIsLoading(true);
        
        if (values.password.length < 8) {
            toast.error("Password must be at least 8 characters.");
            return;
        }

        let url = domain + "/api/auth/local/register";

        try {
            const res = await axios.post(url , values)
            login(res.data.user, res.data.jwt)
            toast.success("Welcome to our Fashion Store!")
            clearCart()
            clearWishList()
            setIsLoading(false);
            navigate("/")
        }
        catch(error) {
            console.log(error);
            toast.error("Username or Email is already registered.");
        }
    }

    useEffect( () => {
        if (token) {
            navigate("/")
        }
    } ,[token])

  return (
    <>
        <div className='flex items-center justify-center w-full h-full py-10'>
            <div className='w-70 sm:w-100 md:w-120 flex flex-col gap-6'>
                <div className='border-2 border-border w-full flex items-center justify-center gap-4 py-2 rounded cursor-pointer'>
                    <img src={Google} alt="" />
                    <p className="text-sm text-text">Continue with Google</p>
                </div>
                <div className="uppercase text-text text-center">or</div>
                <Formik initialValues={initialValues} onSubmit={handleRegister} validationSchema={validationSchema}>
                    <Form className="flex flex-col gap-6 w-full">
                        <label className="flex flex-col gap-2 text-sm text-[#474B57]" htmlFor="">
                            UserName
                            <Field name="username" className="input" type="text" placeholder="Joe doe" />
                            <ErrorMessage name="username" component={"p"} className="text-red-500" />
                        </label>
                        <label className="flex flex-col gap-2 text-sm text-[#474B57]" htmlFor="">
                            Email
                            <Field name="email" className="input" type="email" placeholder="example@gmail.com" />
                            <ErrorMessage name="email" component={"p"} className="text-red-500" />
                        </label>
                        <label className="flex flex-col gap-2 text-sm text-[#474B57]" htmlFor="">
                            Password
                            <Field name="password" className="input" type="password" placeholder="Enter Password" />
                            <ErrorMessage name="password" component={"p"} className="text-red-500" />
                        </label>
                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded font-medium cursor-pointer flex items-center justify-center">
                            {
                                isLoading ? <Spinner />: "Create account"
                            }
                        </button>
                    </Form>
                </Formik>
                <p className="text-sm text-text text-center">Already have an account? <Link to={"/login"}>Log in</Link></p>
            </div>
        </div>
    </>
  )
}
