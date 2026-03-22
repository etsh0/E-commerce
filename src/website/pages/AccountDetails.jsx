import { domain, useAuthStore } from "../../store"
import { AccountHeader } from "../components/AccountHeader"
import axios from "axios"
import toast from "react-hot-toast"
import { Field, Form, Formik } from "formik"

export const AccountDetails = () => {
    const {user, setUpdateUser, token} = useAuthStore()

    const initialValues = {
        username: user?.username,
        email: user?.email
    };

    const handleUpdateUserData = async (values) => {
        let url = domain + `/api/users/${user.id}`
        try {
            const res = await axios.put(url ,values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success("Changes saved successfully! 🎉")
            setUpdateUser(res.data)
            
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <>
        <div>
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
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded text-sm font-medium cursor-pointer">Save Changes</button>
                </Form>
            </Formik>
        </div>
    </>
  )
}
