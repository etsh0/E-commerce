
export const AccountPassword = () => {
  return (
    <>
        <div>
            <h4 className="text-xl font-medium text-primary mb-8">Change Password</h4>
            <form className='flex flex-col gap-6 w-100 mb-10'>
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
