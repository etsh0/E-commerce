
export const ForgotPassword = () => {
  return (
    <div className='flex items-center justify-center w-full h-full py-10'>
        <div className='w-70 sm:w-100 md:w-120 flex flex-col gap-6'>
            <h2 className='text-2xl font-medium text-center mb-4'>Forgot Password</h2>
            <p className='text-sm text-text'>Enter your email address below and we'll send you a link to reset your password.</p>
            <form className='flex flex-col gap-6'>
                <input className='border-2 border-border rounded px-4 py-2 focus:outline-none' type="email" placeholder='Enter your email' />
                <button className='bg-primary text-white py-2 rounded cursor-pointer'>Send reset link</button>
            </form>
        </div>
    </div>
  )
}
