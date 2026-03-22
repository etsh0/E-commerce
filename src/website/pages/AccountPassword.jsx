import { Field, Form, Formik } from "formik"
import { AccountHeader } from "../components/AccountHeader"
import { domain, useAuthStore } from "../../store"
import axios from "axios"
import toast from "react-hot-toast"

export const AccountPassword = () => {
    const {user, token} = useAuthStore()
    
    const initialValues = {
        password:'',
        confirmPassword:''
    }

    const handleUpdatePassword = async (values, {resetForm}) => {

        if(values.password !== values.confirmPassword) {
            toast.error("Passwords do not match! ❌");
            return;
        }

        if (values.password.length < 8) {
            toast.error("Password must be at least 8 characters.");
            return;
        }

        let url = domain + `/api/users/${user.id}`
        try {
            const res = await axios.put(url , {password: values.password}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            resetForm()
            toast.success("Password changed successfully! 🔐");
            
        } catch (error) {
            console.log(error);
            toast.error("Failed to change password.");
        }
    }

  return (
    <>
        <div>
            <AccountHeader title={"Change Password"} />
            <Formik initialValues={initialValues} onSubmit={handleUpdatePassword}>
                <Form className='flex flex-col gap-6 max-w-100 mb-10'>
                    <label className="flex flex-col gap-2 text-sm text-[#474B57]" htmlFor="">
                        New Password
                        <Field name='password' className="input" type="password" required />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-[#474B57]" htmlFor="">
                        Confirm Password
                        <Field name='confirmPassword' className="input" type="password" required />
                    </label>
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded text-sm font-medium cursor-pointer">Change Password</button>
                </Form>
            </Formik>
        </div>
    </>
  )
}
