import Avatar from "../../assets/Avatar_reviews.svg"
import EmptyStar2 from "../../assets/Empty Star2.svg"
import FillStar from "../../assets/FillStar.svg"

export const ReviewCard = () => {
  return (
    <div className='card-review flex items-center gap-6 '>
        <img src={Avatar} alt="" />
        <div className="content grow">
            <div className="flex flex-col sm:flex-row gap-2 justify-between">
                <h4 className="text-sm font-medium">Ahmed Hesham</h4>
                <div className="stars flex items-center gap-1">
                    <img src={FillStar} alt="" />
                    <img src={FillStar} alt="" />
                    <img src={FillStar} alt="" />
                    <img src={FillStar} alt="" />
                    <img src={EmptyStar2} alt="" />
                </div>
            </div>
            <p className="text-text text-sm mt-6">This company always goes above and beyond to satisfy their customers.</p>
        </div>
    </div>
  )
}
