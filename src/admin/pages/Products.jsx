import { NavLink, Outlet } from "react-router-dom"
import { SearchBar } from "../../components/SearchBar"
import { ProductRow } from "../components/ProductRow"
export const Products = () => {

  return (
    <>
      <div className="bg-secondary px-10">
        <div className="shadow bg-white border border-border px-6 py-8 flex flex-col h-screen">
          <div className="header flex items-center justify-between">
            <h4 className="text-lg text-primary font-semibold">Products</h4>
            <div className="flex gap-4">
                <SearchBar />
                <NavLink to={"add-product"} className="bg-primary py-2.5 px-4 rounded-lg text-sm font-medium text-white cursor-pointer">Add Product</NavLink>
            </div>
          </div>
          <div className="overflow-y-auto grow mt-8">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="text-text border-y border-border">
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">price</th>
                    <th className="px-6 py-4 font-medium">Stock</th>
                    <th className="px-6 py-4 font-medium">Categories</th>
                    <th className="px-6 py-4 font-medium">Is Featured</th>
                    <th className="px-6 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border overflow-auto">
                  <ProductRow />
                  <ProductRow />
                  <ProductRow />
                  <ProductRow />
                  <ProductRow />
                  <ProductRow />
                  <ProductRow />
                  <ProductRow />
                  <ProductRow />
                  <ProductRow />
                  <ProductRow />
                  <ProductRow />
                  <ProductRow />
                  <ProductRow />
                  <ProductRow />
                  <ProductRow />
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </>
  )
}
