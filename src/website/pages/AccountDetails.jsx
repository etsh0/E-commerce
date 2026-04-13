import { domain, useAuthStore } from "../../store"
import { AccountHeader } from "../components/AccountHeader"
import axios from "axios"
import { Field, Form, Formik } from "formik"
import { useState } from "react"
import { Spinner } from "../../components/Spinner"
import { toast } from "sonner"

export const AccountDetails = () => {
    const {user, setUpdateUser, token} = useAuthStore()
    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialValues = {
        username: user?.username,
        email: user?.email
    };

    const handleUpdateUserData = async (values) => {
        setIsSubmitting(true)
        let url = domain + `/api/users/${user.id}`
        try {
            const res = await axios.put(url ,values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setIsSubmitting(false)
            toast.success("Changes saved successfully! 🎉")
            setUpdateUser(res.data)
            
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <>
        <div >
            <AccountHeader title={"Account Details"} />
            <Formik initialValues={initialValues} onSubmit={handleUpdateUserData} enableReinitialize={true}>
                <Form className='flex flex-col gap-6 max-w-100 mb-10'>
                    <label className="flex flex-col gap-2 text-sm text-[#474B57]" htmlFor="">
                        UserName
                        <Field name="username" className="input" type="text" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-[#474B57]" htmlFor="">
                        Email
                        <Field name="email" className="input" type="email" />
                    </label>
                    <button type="submit" className="btn-animate bg-primary text-white md:before:bg-white md:hover:text-primary w-full px-4 py-2 text-sm font-medium ">
                        {
                            isSubmitting ? <Spinner /> : <span>Save Changes</span>
                        }
                    </button>
                </Form>
            </Formik>
        </div>
    </>
  )
}
