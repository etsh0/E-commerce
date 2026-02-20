import { AccountHeader } from "../components/AccountHeader"

export const AccountDetails = () => {
  return (
    <>
        <div>
            <AccountHeader title={"Account Details"} />
            <form className='flex flex-col gap-6 max-w-100 mb-10'>
                <label className="flex flex-col gap-2 text-sm text-[#474B57]" htmlFor="">
                    Full Name
                    <input className="input" type="text" />
                </label>
                <label className="flex flex-col gap-2 text-sm text-[#474B57]" htmlFor="">
                    Email
                    <input className="input" type="email" />
                </label>
            </form>
            <button className="bg-primary text-white px-4 py-2 rounded text-sm font-medium cursor-pointer">Save Changes</button>
        </div>
    </>
  )
}
