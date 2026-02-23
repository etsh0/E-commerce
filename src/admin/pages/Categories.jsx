import { SearchBar } from "../../components/SearchBar"
import { CategoryRow } from "../components/CategoryRow"

export const Categories = () => {
  return (
    <>
      <div className="bg-secondary px-10">
        <div className="shadow bg-white border border-border px-6 py-8 flex flex-col h-screen">
          <div className="header flex items-center justify-between">
            <h4 className="text-lg text-primary font-semibold">Categories</h4>
            <div className="flex gap-4">
                <SearchBar />
                <button className="bg-primary py-2.5 px-4 rounded-lg text-sm font-medium text-white cursor-pointer">Add Category</button>
            </div>
          </div>
          <div className="overflow-y-auto grow mt-8">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="text-text border-y border-border">
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">Description</th>
                    <th className="px-6 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border overflow-auto">
                  <CategoryRow />
                  <CategoryRow />
                  <CategoryRow />
                  <CategoryRow />
                  <CategoryRow />
                  <CategoryRow />
                  <CategoryRow />
                  <CategoryRow />
                  <CategoryRow />
                  <CategoryRow />
                  <CategoryRow />
                  <CategoryRow />
                  <CategoryRow />
                  <CategoryRow />
                  <CategoryRow />
                </tbody>
              </table>
          </div>
        </div>
      </div>    
    </>
  )
}
