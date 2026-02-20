
export const AccountDetails = () => {
  return (
    <>
        <div>
            <h4 className="text-xl font-medium text-primary mb-8">Account Details</h4>
            <form className='flex flex-col gap-6 w-100 mb-10'>
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
