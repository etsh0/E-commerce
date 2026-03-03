import { Link, useNavigate } from "react-router-dom"
import Google from "../../../assets/Google.svg"
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { domain, useAuthStore } from "../../../store";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

export const Login = () => {

    const {login , token} = useAuthStore()
    const navigate = useNavigate()

    const initialValues = {
        identifier: "",
        password: "",
    };

    const validationSchema = Yup.object({
        identifier: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required")
    })

    const handleLogin = async (values) => {

        let url = domain + "/api/auth/local"

        try {
            const res = await axios.post(url, values)
            if(res.data.user.isAdmin) {
                toast.error("Login failed.")
                return;
            }
            toast.success("Welcome to our Fashion Store!");
            login(res.data.user , res.data.jwt)
            navigate("/")
        }
        catch(error) {
            console.log(error);
            toast.error("Login failed.");
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
                <Formik initialValues={initialValues} onSubmit={handleLogin} validationSchema={validationSchema}>
                    <Form className="flex flex-col gap-6 w-full">
                        <label className="flex flex-col gap-2 text-sm text-[#474B57]" htmlFor="">
                             Email
                            <Field name="identifier" className="input" type="email" />
                            <ErrorMessage name="identifier" component={"p"} className="text-red-500"/>
                        </label>
                        <label className="flex flex-col gap-2 text-sm text-[#474B57]" htmlFor="">
                            password
                            <Field name="password" className="input" type="password" />
                            <ErrorMessage name="password" component={"p"} className="text-red-500"/>
                        </label>
                        <button className="text-sm text-text font-medium self-end"><Link>Forgot Password?</Link></button>
                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded font-medium cursor-pointer">Login</button>
                        <p className="text-sm text-text text-center">Don't have an account? <Link to={"/register"}>Sign Up</Link></p>
                    </Form>
                </Formik>
            </div>
        </div>
    </>
  )
}
