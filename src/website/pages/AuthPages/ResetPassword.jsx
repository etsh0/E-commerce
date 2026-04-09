
export const ResetPassword = () => {
  return (
    <div className='flex items-center justify-center w-full h-full py-10'>
        <div className='w-70 sm:w-100 md:w-120 flex flex-col gap-6'>
            <h2 className='text-2xl font-medium text-center mb-4'>Reset Password</h2>
            <form className='flex flex-col gap-6'>
                <label className="flex flex-col gap-4 text-text font-medium">
                    New Password
                    <input className='border-2 border-border rounded px-4 py-2 focus:outline-none text-sm' type="password" placeholder='' />
                </label>
                <label className="flex flex-col gap-4 text-text font-medium">
                    Confirm New Password
                    <input className='border-2 border-border rounded px-4 py-2 focus:outline-none text-sm' type="password" placeholder='' />    
                </label>
                <button className='bg-primary text-white py-2 rounded cursor-pointer'>Reset Password</button>
            </form>
        </div>
    </div>
  )
}
