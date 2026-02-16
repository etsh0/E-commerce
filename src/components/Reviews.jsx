import { ReviewCard } from "../website/components/ReviewCard"

export const Reviews = () => {
  return (
    <>
        <div className=''>
            <h4 className='text-xl font-semibold'>Reviews</h4>
            <div className='mt-4'>
               <div className='text-text text-sm'><span className='text-2xl font-bold text-primary'>4.2</span> — 54 Reviews</div> 
               <button className='border border-primary text-sm font-medium px-6 py-2 mt-6 rounded cursor-pointer transition-colors duration-300 hover:bg-primary hover:text-white'>Write a review</button>
            </div>
            <div className="reviews-container flex flex-col gap-15 mt-4 pt-10 border-t-2 2xl:pr-50 border-border">
                <ReviewCard />
                <ReviewCard />
            </div>
        </div>
    </>
  )
}
