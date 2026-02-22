import Search from "../../assets/Search.svg"


import { ProductRow } from "../components/ProductRow"
export const Products = () => {

  return (
    <>
      <div className="bg-secondary px-10">
        <div className="shadow bg-white border border-border px-6 py-8 flex flex-col h-screen">
          <div className="header flex items-center justify-between">
            <h4 className="text-lg text-primary font-semibold">Products</h4>
            <div className="flex gap-4">
                <div className="search-bar relative ">
                    <input type='text' placeholder='Search Products' className=' w-66 pl-11.75 input' />
                    <img src={Search} alt="" className='absolute top-[50%] translate-y-[-50%] left-4' />
                </div>
                <button className="bg-primary py-2.5 px-4 rounded-lg text-sm font-medium text-white cursor-pointer">Add Product</button>
            </div>
          </div>
          <div className="overflow-y-auto grow mt-8">
              <table class="w-full text-left">
                <thead className="sticky top-0 bg-white z-10">
                  <tr class="text-text border-b border-border">
                    <th class="px-6 py-4 font-medium">Name</th>
                    <th class="px-6 py-4 font-medium">price</th>
                    <th class="px-6 py-4 font-medium">Stock</th>
                    <th class="px-6 py-4 font-medium">Categories</th>
                    <th class="px-6 py-4 font-medium">Is Featured</th>
                    <th class="px-6 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border overflow-auto">
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
