import { ErrorMessage, Field, Form, Formik } from "formik";
import Logo from "../../assets/Admin_logo.svg"
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { domain, useAuthAdmin } from "../../store";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";




export const LoginPage = () => {

    const {adminLogin, adminToken} = useAuthAdmin()
    const navigate = useNavigate()

    const initialValues = {
        identifier : "",
        password : ""
    }

    const validationSchema = Yup.object({
        identifier: Yup.string().email().required("Email is required"),
        password : Yup.string().required("Password is required")
    })

    const handleLoginAdmin = async (values) => {
        let url = domain + "/api/auth/local"
        try {
            const res = await axios.post(url,values)
            if(res.data.user.isAdmin) {
                toast.success("Welcome back, Admin!");
                adminLogin(res.data.user , res.data.jwt)
                navigate("/admin")    
            }else {
                toast.error("You don't have admin permissions.");
            }
        }
        catch (error) {
            toast.error("Invalid email or password.");
            console.log(error); 
        }
    }

    useEffect( () => {
        if(adminToken) {
            navigate("/admin")
        }
    } ,[adminToken])

  return (
    <>
        <div className="flex items-center justify-center bg-secondary h-dvh">
            <div className="bg-white shadow-2xl border border-border rounded-lg py-6 px-4 w-110">
                <div className="image flex justify-center">
                    <img src={Logo} alt="" />
                </div>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLoginAdmin}>
                    <Form className="flex flex-col gap-8 mt-10" >
                        <label className="flex flex-col gap-2 text-sm font-medium text-[#474B57]" htmlFor="">
                            Email
                            <Field name="identifier" className="input" type="email" />
                            <ErrorMessage component={"p"} className="text-red-500" name="identifier" /> 
                        </label>
                        <label className="flex flex-col gap-2 text-sm font-medium text-[#474B57]" htmlFor="">
                            Password
                            <Field name="password" className="input" type="password" />
                            <ErrorMessage component={"p"} className="text-red-500" name="password" /> 
                        </label>
                        <button type="submit" className="bg-primary text-white py-3 rounded text-sm font-medium cursor-pointer">Login</button>
                    </Form>
                </Formik>
            </div>
        </div>
    </>
  )
}
