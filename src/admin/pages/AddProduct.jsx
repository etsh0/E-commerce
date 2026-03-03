

export const AddProduct = () => {
  return (
    <>
      <div className="bg-secondary px-10">
        <div className="shadow bg-white border border-border flex flex-col">
          <div className="header flex items-center justify-between px-6 py-8">
            <h4 className="text-lg text-primary font-semibold">Add Product</h4>
          </div>
          <div className="border-t border-border px-15 py-8">
                <form action="" className="grid grid-cols-2 gap-x-20 gap-y-6">
                    <div className="space-y-5">
                        <label className="flex flex-col gap-2 text-sm font-medium text-primary" htmlFor="">
                            Title
                            <input className="input" type="text" />
                        </label>
                        <label className="flex flex-col gap-2 text-sm font-medium text-primary" htmlFor="">
                            Price
                            <input className="input" type="text" />
                        </label>
                        <label className="flex flex-col gap-2 text-sm font-medium text-primary" htmlFor="">
                            Category
                            <input className="input" type="text" />
                        </label>
                        <label className="flex flex-col gap-2 text-sm font-medium text-primary" htmlFor="">
                            Slug
                            <input className="input" type="text" />
                        </label>
                        <label className="flex flex-col gap-2 text-sm font-medium text-primary" htmlFor="">
                            SKU
                            <input className="input" type="text" />
                        </label>
                        <label className="flex flex-col gap-2 text-sm font-medium text-primary" htmlFor="">
                            Description
                            <textarea className="resize-none w-full input h-40"></textarea>
                        </label> 
                        <button className="px-4 py-2 bg-primary text-white font-medium text-sm rounded mt-4 cursor-pointer">Save Product</button>
                    </div>
                    <div className="space-y-5">
                         <label className="flex flex-col gap-2 text-sm font-medium text-primary" htmlFor="">
                            Stock Status
                            <input className="input" type="text" />
                        </label>
                        <label className="flex flex-col gap-2 text-sm font-medium text-primary" htmlFor="">
                            Available quantity
                            <input className="input" type="text" />
                        </label>                    
                    </div>
                </form>
          </div>
        </div>
      </div>
    </>
  )
}
