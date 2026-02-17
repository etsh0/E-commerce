import { useState } from "react"
import { ReviewCard } from "../website/components/ReviewCard"
import { MdClose } from "react-icons/md"
import EmptyStar2 from "../assets/Empty Star2.svg"
import FillStar from "../assets/FillStar.svg"

export const Reviews = () => {

  const [modalIsOpen,setModalIsOpen] = useState(false)
  return (
    <>
        <div className=''>
            <h4 className='text-xl font-semibold'>Reviews</h4>
            <div className='mt-4'>
               <div className='text-text text-sm'><span className='text-2xl font-bold text-primary'>4.2</span> — 54 Reviews</div> 
               <button className='border border-primary text-sm font-medium px-6 py-2 mt-6 rounded cursor-pointer transition-colors duration-300 hover:bg-primary hover:text-white' onClick={() => setModalIsOpen(true)}>Write a review</button>
            </div>
            <div className="reviews-container flex flex-col gap-15 mt-4 pt-10 border-t-2 2xl:pr-50 border-border">
                <ReviewCard />
                <ReviewCard />
            </div>
        </div>
        {
          modalIsOpen && (
            <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white shadow border border-border w-full max-w-lg relative rounded-lg p-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Write Review</h3>
                    <MdClose size={"20px"} className="cursor-pointer" onClick={() => setModalIsOpen(false)} />
                  </div>
                  <form action="" className="flex flex-col gap-4 py-6">
                    <label className="flex flex-col gap-2 text-sm font-medium text-primary" htmlFor="">
                      Email
                      <input className="input" type="text" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium text-primary" htmlFor="">
                      Full name
                      <input className="input" type="text" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium text-primary" htmlFor="">
                      Review
                      <textarea className="resize-none w-full input h-35"></textarea>
                    </label> 
                  </form>
                  <div className="stars flex items-center gap-1">
                      <img src={FillStar} alt="" />
                      <img src={FillStar} alt="" />
                      <img src={FillStar} alt="" />
                      <img src={FillStar} alt="" />
                      <img src={EmptyStar2} alt="" />
                  </div>
                  <button type="submit" className="bg-primary flex items-center justify-center text-white w-full py-2 rounded cursor-pointer whitespace-nowrap mt-6">Submit Your Review</button>
              </div>
            </div>
          )
        }
    </>
  )
}
