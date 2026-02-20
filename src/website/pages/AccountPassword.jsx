import { AccountHeader } from "../components/AccountHeader"

export const AccountPassword = () => {
  return (
    <>
        <div>
            <AccountHeader title={"Change Password"} />
            <form className='flex flex-col gap-6 max-w-100 mb-10'>
                <label className="flex flex-col gap-2 text-sm text-[#474B57]" htmlFor="">
                    New Password
                    <input className="input" type="password" />
                </label>
                <label className="flex flex-col gap-2 text-sm text-[#474B57]" htmlFor="">
                    Confirm Password
                    <input className="input" type="password" />
                </label>
            </form>
            <button className="bg-primary text-white px-4 py-2 rounded text-sm font-medium cursor-pointer">Change Password</button>
        </div>
    </>
  )
}
