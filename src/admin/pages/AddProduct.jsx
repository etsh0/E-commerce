import { Formik, Form, Field } from "formik";
import { domain, useCategoriesStore } from "../../store";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const AddProduct = ({ selectedProduct }) => {
  const { categories } = useCategoriesStore();
  const [colors , setColors] = useState([])
  const [sizes , setSizes] = useState([])

  const initialValues = {
    title: selectedProduct?.title || '',
    price: selectedProduct?.price || '',
    stock_status: selectedProduct?.stock_status || 'in_stock',
    category: selectedProduct?.category?.documentId || '',
    slug: selectedProduct?.slug || '',
    details: selectedProduct?.details || '',
    available_quantity: selectedProduct?.available_quantity || 0,
    colors: selectedProduct?.colors?.map(c => c.documentId) || [],
    sizes: selectedProduct?.sizes?.map(s => s.documentId) || [],
    isBestSelling: selectedProduct?.isBestSelling || false,
    isFeatured: selectedProduct?.isFeatured || false,
  };

  const fetchColors = async () => {
      let url = domain + "/api/colors"
      try{
          const res = await axios.get(url)
          setColors(res.data.data)
          
      }
      catch(error) {
          console.log(error);
      }
  }

  const fetchSizes = async () => {
      let url = domain + "/api/sizes"
      try{
          const res = await axios.get(url)
          setSizes(res.data.data)
          
      }
      catch(error) {
          console.log(error);
      }
  }

  useEffect( () => {
      fetchColors()
      fetchSizes()
  } ,[])

  return (
    <div className="bg-secondary pl-10">
      <div className="shadow bg-white border border-border flex flex-col rounded-lg">
        <div className="header flex items-center justify-between px-6 py-8 border-b border-border">
          <h4 className="text-lg text-primary font-semibold">
            {selectedProduct ? "Edit Product" : "Add New Product"}
          </h4>
          <Link className="bg-primary text-white py-1 px-4 rounded text-sm font-bold" to={"/admin/products"}>Back</Link>
        </div>

        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={(values) => console.log(values)}
        >
          {({ setFieldValue, values }) => (
            <Form className="grid grid-cols-12 gap-8 p-8">
              
              <div className="col-span-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <label className="flex flex-col gap-2 text-sm font-medium text-primary">
                    Title
                    <Field name="title" className="input" placeholder="Product name" />
                  </label>
                  <label className="flex flex-col gap-2 text-sm font-medium text-primary">
                    Price
                    <Field name="price" className="input" type="number" />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <label className="flex flex-col gap-2 text-sm font-medium text-primary">
                    Slug
                    <Field name="slug" className="input" />
                  </label>
                  <label className="flex flex-col gap-2 text-sm font-medium text-primary">
                    Available quantity
                    <Field name="available_quantity" className="input" type="number" />
                  </label>
                </div>

                <label className="flex flex-col gap-2 text-sm font-medium text-primary">
                  Details
                  <Field as="textarea" name="details" className="input h-40 resize-none overflow-y-auto" />
                </label>

                <div className="border-2 h-60 border-dashed border-border rounded-lg p-10 flex flex-col items-center justify-center gap-4 bg-gray-50">
                   <input 
                    type="file" multiple id="img-upload" className="hidden" 
                    onChange={(e) => setFieldValue("images", Array.from(e.target.files))}
                   />
                   <label htmlFor="img-upload" className="cursor-pointer bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold">
                      + Add Media (Images)
                   </label>
                   {values?.images?.length > 0 && <p className="text-xs text-gray-500">{values.images.length} files selected</p>}
                </div>
              </div>

              <div className="col-span-4 space-y-6 bg-gray-50 p-6 rounded-xl border border-border">
                
                {/* Stock & Category */}
                <label className="flex flex-col gap-2 text-sm font-medium text-primary">
                  Stock Status
                  <Field as="select" name="stock_status" className="input">
                    <option value="in_stock">In Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </Field>
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-primary">
                  Category
                  <Field as="select" name="category" className="input">
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.documentId}>{cat.name}</option>
                    ))}
                  </Field>
                </label>

                {/* Colors Section */}
                <div className="space-y-3">
                    <span className="text-sm font-bold text-primary block border-b pb-2">Add New Color</span>
                    <div className="grid grid-cols-2 gap-2">
                    <input type="text" className="input h-9 text-[10px]" placeholder="Color Name (Red)" />
                    <input type="text" className="input h-9 text-[10px]" placeholder="HEX (#FF0000)" />
                    </div>
                    <input type="text" className="input h-9 text-[10px]" placeholder="Slug (red-color)" />
                    
                    <button type="button" className="w-full py-2 bg-primary text-white rounded-md text-xs font-bold hover:bg-primary/90 transition-colors cursor-pointer">
                    + Add Color to System
                    </button>
                  <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                    {/* Placeholder للـ Checkboxes */}
                    {
                        colors.map( (c) => (
                            <label key={c.documentId} className="flex items-center gap-2 bg-white border border-border px-2 py-1 rounded text-xs cursor-pointer">
                                <Field type="checkbox" name="colors" value={c.slug} />
                                 {c.slug}
                            </label>
                        ))
                    }
                  </div>
                </div>

                {/* Sizes Section */}
                <div className="space-y-3 pt-2">
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider block border-b pb-2">New Size Entry</span>
                    <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                            <input type="text" className="input h-9 text-[11px]" placeholder="Value (e.g. XL)" />
                            <input type="text" className="input h-9 text-[11px]" placeholder="Slug" />
                        </div>
                        <button type="button" className="w-full py-2 bg-primary text-white rounded text-xs font-bold cursor-pointer">
                            Create & Link Size
                        </button>
                    </div>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map(s => (
                      <label key={s.documentId} className="cursor-pointer">
                        <Field type="checkbox" name="sizes" value={s.size_value} className="hidden peer" />
                        <div className="w-9 h-9 flex items-center justify-center border border-border rounded bg-white text-xs font-bold peer-checked:bg-primary peer-checked:text-white transition-all">
                          {s.slug}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="flex flex-col gap-4 pt-4 border-t border-border">
                   <label className="flex items-center gap-3 cursor-pointer">
                      <Field type="checkbox" name="isBestSelling" className="w-4 h-4" />
                      <span className="text-sm font-medium">Best Selling</span>
                   </label>
                   <label className="flex items-center gap-3 cursor-pointer">
                      <Field type="checkbox" name="isFeatured" className="w-4 h-4" />
                      <span className="text-sm font-medium">Featured Product</span>
                   </label>
                </div>

                <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition-all mt-4">
                  {selectedProduct ? "Update Product" : "Publish Product"}
                </button>
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};