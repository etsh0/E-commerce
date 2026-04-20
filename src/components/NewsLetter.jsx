
export const NewsLetter = () => {
  return (
    <>
        <div className='bg-secondary mt-4'>
            <div className="container flex flex-col md:flex-row items-center justify-between gap-6 py-14.75 ">
                <div className="text text-center md:text-left">
                    <h3 className='text-primary text-2xl font-bold'>Subscribe to our Newsletter</h3>
                    <p className='text-text text-sm mt-2'>Get the latest updates on new products and upcoming sales</p>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <input className='input border-[#878A92]/40 w-70 md:w-[320px] px-3.5 rounded' type="email" placeholder='Enter your email address' />
                    <button className='bg-primary text-white px-4 py-2.5 rounded text-sm'>Subscribe</button>
                </div>
            </div>
        </div>
    </>
  )
}
