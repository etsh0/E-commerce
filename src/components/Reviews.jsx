import { useEffect, useState } from "react"
import { ReviewCard } from "../website/components/ReviewCard"
import { MdClose } from "react-icons/md"
import emptystate from "../assets/Empty State.svg"
import { useOutletContext } from "react-router-dom"
import { BsStar, BsStarFill } from "react-icons/bs"
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { domain, useReviewsCounter } from './../store/index';
import  axios  from 'axios';
import toast from "react-hot-toast"

export const Reviews = () => {

  const {rate,productId} = useOutletContext()
  const [modalIsOpen,setModalIsOpen] = useState(false)
  const [allReviews, setAllReviews] = useState([])
  const {reviewsCount, setReviewsCount} = useReviewsCounter()
  const [selectedRating, setSelectedRating] = useState(1);
  

  const initialValues = {
    reviewer_name : '',
    email : '',
    comment : '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    reviewer_name: Yup.string().min(3,"Name is too short").required("Please enter your name"),
    comment: Yup.string().min(8, "Tell us more! (at least 8 characters)").required("Review text is required")
  })

  const fetchReviews = async () => {
    let url = domain + '/api/reviews'
    try {
      const res = await axios.get(url, {
        params: {
          populate: '*',
          filters: {
            product: {
              documentId: {
                $eq: productId
              }
            }
          }
        }
      })
      
      setAllReviews(res.data.data)
      setReviewsCount(res.data.data.length)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    fetchReviews()
  },[productId])

  const handleSubmitReview = async (values ,{ resetForm }) => {
    const reviewData = {
      data: {
        ...values,
        product: productId,
        rating : selectedRating
      }
    }

    let url = domain + '/api/reviews?populate=*'
    try {
      const res = await axios.post(url, reviewData)
      toast.success("Review submitted!")
      resetForm()
      fetchReviews()
      setSelectedRating(1)
      setModalIsOpen(false)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
        <div className=''>
            <h4 className='text-xl font-semibold'>Reviews</h4>
            <div className={`mt-4 ${allReviews?.length === 0 && "hidden"}`}>
               <div className='text-text text-sm'><span className='text-2xl font-bold text-primary'>{rate}</span> — {reviewsCount} Reviews</div> 
               <button className='border border-primary text-sm font-medium px-6 py-2 mt-6 rounded cursor-pointer transition-colors duration-300 hover:bg-primary hover:text-white' onClick={() => setModalIsOpen(true)}>Write a review</button>
            </div>
            <div className="reviews-container flex flex-col gap-15 mt-4 pt-10 border-t-2 2xl:pr-50 border-border">
              {
                allReviews?.length === 0 ? 
              (               
                <div className="empty-state text-center">
                  <div className="w-full flex items-center justify-center">
                    <img className="" src={emptystate} alt="" />
                  </div>
                  <p className="text-text mt-6">No Reviews Yet! Be the first to share your thoughts about this product</p>
                  <button className='border border-primary text-sm font-medium px-6 py-2 mt-6 rounded cursor-pointer transition-colors duration-300 hover:bg-primary hover:text-white' onClick={() => setModalIsOpen(true)}>Write a review</button>
                </div>   
              ) : allReviews.map( (review) => (
                <ReviewCard key={review.documentId} review={review}/>
              ))
              }             
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
                  <Formik initialValues={initialValues} onSubmit={handleSubmitReview} validationSchema={validationSchema}>
                    <Form action="" className="flex flex-col gap-4 py-6">
                      <label className="flex flex-col gap-2 text-sm font-medium text-primary" htmlFor="">
                        Email
                        <Field className="input" type="text" name='email' />
                        <ErrorMessage name="email" component={"p"} className="text-red-500" />
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-medium text-primary" htmlFor="">
                        Full name
                        <Field className="input" type="text" name='reviewer_name' />
                        <ErrorMessage name="reviewer_name" component={"p"} className="text-red-500" />
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-medium text-primary" htmlFor="">
                        Review
                        <Field as="textarea" className="resize-none w-full input h-35" name='comment'></Field>
                        <ErrorMessage name="comment" component={"p"} className="text-red-500" />
                      </label> 
                      <div className="stars flex items-center gap-1">
                        {
                          [1,2,3,4,5].map( (num) => (
                            <span
                                key={num}
                                onClick={() => 
                                  setSelectedRating(num)
                                }
                                className="cursor-pointer"
                              >
                                {num <= selectedRating ? (
                                  <BsStarFill className="text-text" /> 
                                ) : (
                                  <BsStar className="text-text" /> 
                                )}
                            </span>
                          ))
                        }
                      </div>
                      <button type="submit" className="bg-primary flex items-center justify-center text-white w-full py-2 rounded cursor-pointer whitespace-nowrap mt-6">Submit Your Review</button>
                    </Form>
                  </Formik>
              </div>
            </div>
          )
        }
    </>
  )
}
