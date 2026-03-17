import { BsStar, BsStarFill } from "react-icons/bs"

export const ReviewCard = ({review}) => {

  return (
    <div className='card-review flex items-center gap-6 '>
        <div className="w-12 h-12 rounded-full bg-secondary text-[#4078FF] flex justify-center items-center">
            <span>{review.reviewer_name.slice(0,2).toUpperCase()}</span>
        </div>
        <div className="content grow">
            <div className="flex flex-col sm:flex-row gap-2 justify-between">
                <h4 className="text-sm font-medium">{review.reviewer_name}</h4>
                <div className="stars flex items-center gap-1">
                    {
                        [1,2,3,4,5].map( (num) => (
                            <span key={num}>
                                {
                                    num <= review.rating ? (<BsStarFill className="text-text" />) : (<BsStar className="text-text" />) 
                                }
                            </span>
                        ))
                    }
                </div>
            </div>
            <p className="text-text text-sm mt-6">{review.comment}</p>
        </div>
    </div>
  )
}
