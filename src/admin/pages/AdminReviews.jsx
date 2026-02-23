import { SearchBar } from "../../components/SearchBar"
import { ReviewRow } from "../components/ReviewRow"

export const AdminReviews = () => {
  return (
    <>
      <div className="bg-secondary px-10">
        <div className="shadow bg-white border border-border px-6 py-8 flex flex-col h-screen">
          <div className="header flex items-center justify-between">
            <h4 className="text-lg text-primary font-semibold">Reviews</h4>
            <SearchBar />
          </div>
          <div className="overflow-y-auto grow mt-8">
              <table className="w-full text-left">
                <thead classNameName="sticky top-0 bg-white z-10">
                  <tr className="text-text border-y border-border">
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">Review</th>
                    <th className="px-6 py-4 font-medium">Rating</th>
                    <th className="px-6 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border overflow-auto">
                  <ReviewRow />
                  <ReviewRow />
                  <ReviewRow />
                  <ReviewRow />
                  <ReviewRow />
                  <ReviewRow />
                  <ReviewRow />
                  <ReviewRow />
                  <ReviewRow />
                </tbody>
              </table>
          </div>
        </div>
      </div>    
    </>
  )
}
