import { useEffect, useState } from "react"
import { SearchBar } from "../../components/SearchBar"
import { ReviewRow } from "../components/ReviewRow"
import { domain } from "../../store"
import axios from "axios"
import toast from "react-hot-toast"

export const AdminReviews = () => {

  const [allReviews , setAllReviews] = useState([])

  const fetchAllReviews = async (value) => {
    let url = domain + '/api/reviews'
    try {
      const res = await axios.get(url , {
        params: {
          populate: '*',
          sort: 'createdAt:desc',
          filters: {
            reviewer_name: {
              $containsi: value
            }
          }
        }
      })
      
      setAllReviews(res.data.data)
      
    } catch (error) {
      console.log(error);
    }
  }


  const handleDeleteReview = async (reviewId) => {
      let url = domain + `/api/reviews/${reviewId}`
      try {
          const res = await axios.delete(url)
          setAllReviews(allReviews.filter( r => r.documentId !== reviewId))
          toast.success("Review deleted successfully")
      } catch (error) {
          console.log(error);
      }
  }

  // useEffect( () => {
  //   fetchAllReviews()
  // } ,[])

  return (
    <>
      <div className="bg-secondary px-10">
        <div className="shadow bg-white border border-border px-6 py-8 flex flex-col h-screen">
          <div className="header flex items-center justify-between">
            <h4 className="text-lg text-primary font-semibold">Reviews</h4>
            <SearchBar fetchAllReviews={ (value) => fetchAllReviews(value)} />
          </div>
          <div className="overflow-y-auto grow mt-8">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="text-text border-y border-border">
                    <th className="px-6 py-4 font-medium">User</th>
                    <th className="px-6 py-4 font-medium">Product</th>
                    <th className="px-6 py-4 font-medium">Review Content</th>
                    <th className="px-6 py-4 font-medium">Rating</th>
                    <th className="px-6 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border overflow-auto">
                  {
                    allReviews?.map( (review) => (
                      <ReviewRow key={review.documentId} review={review} onDelete={() => handleDeleteReview(review.documentId)} />
                    ))
                  }
                </tbody>
              </table>
          </div>
        </div>
      </div>    
    </>
  )
}
