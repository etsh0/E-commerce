import { Formik, Form, Field, ErrorMessage } from "formik";
import { domain, useAuthAdmin, useCategoriesStore, useProductStore } from "../../store";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import * as Yup from "yup";
import { Spinner } from "../../components/Spinner";
import { toast } from "sonner";


export const AddProduct = () => {

  const {adminToken} = useAuthAdmin()
  const { categories } = useCategoriesStore();
  const {selectedProduct,addProduct,updateProduct} = useProductStore()
  const [colors , setColors] = useState([])
  const [sizes , setSizes] = useState([])
  const [newColorData, setNewColorData] = useState({ name: '', hex_code: '', slug: '' });
  const [newSizeData, setNewSizeData] = useState({ size_value: '', slug: '' });
  const [uploading, setUploading] = useState(false);
  const [uploadSize, setUploadSize] = useState(false);
  const [uploadColor, setUploadColor] = useState(false);
  let url_color = domain + "/api/colors"
  let url_size = domain + "/api/sizes"


  const initialValues = {
    title: selectedProduct?.title || '',
    price: selectedProduct?.price || '',
    stock_status: selectedProduct?.stock_status || 'IN STOCK',
    category: selectedProduct?.category?.documentId || '',
    details: selectedProduct?.details || '',
    rate: selectedProduct?.rate || '',
    available_qty: selectedProduct?.available_qty || 0,
    colors: selectedProduct?.colors?.map(c => c.documentId) || [],
    sizes: selectedProduct?.sizes?.map(s => s.documentId) || [],
    isBestSelling: selectedProduct?.isBestSelling || false,
    isFeatured: selectedProduct?.isFeatured || false,
    discount: selectedProduct?.discount || 0,
    images: [],
    reviews:[]
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Product title is required"),
    price: Yup.number().typeError("Price must be a number").required("Product price is required"),
    stock_status: Yup.string().oneOf(["IN STOCK", "OUT OF STOCK"], "Invalid stock status").required("Stock status is required"),
    category: Yup.string().required("Category is required"),
    details: Yup.string().required("Product details are required"),
    rate: Yup.number().typeError("Rate must be a number").min(0, "Rate cannot be negative").max(5, "Rate cannot be more than 5").required("Product rate is required"),
    available_qty: Yup.number().typeError("Available quantity must be a number").min(0, "Available quantity cannot be negative").required("Available quantity is required"),
  })


  // to upload images to strapi
  const [selectedFiles, setSelectedFiles] = useState([]); // state to hold selected files (user)
  const [previewUrls, setPreviewUrls] = useState([]); // state to hold preview URLs for selected images (for user to see before uploading)

  // Handle file selection
  const handleFileChange = (e) => {
    // Convert FileList to an array and update state
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) =>  [...prev, ...files]);
    // Generate preview URLs for the selected files
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  }

  // Remove image from selection
  const removeImage = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  // Function to upload images to Strapi and get their IDs
  const uploadImagesToStrapi = async () => {
    if (selectedFiles.length === 0) return [];
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });
    const res = await axios.post(`${domain}/api/upload`, formData, {
      headers: {
         "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${adminToken}`,
        },
    });
    return res.data.map((file) => file.id);
  };

  
  // ✅ إضافة state للصور الموجودة على Strapi
  const [existingImages, setExistingImages] = useState(selectedProduct?.images || []);

  // ✅ دالة لحذف صورة موجودة من Strapi
  const removeExistingImage = async (imageId) => {
  try {
    await axios.delete(`${domain}/api/upload/files/${imageId}`,{
      headers: {
          Authorization: `Bearer ${adminToken}`,
      }
    });
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
  } catch (error) {
    console.log(error);
  }
  };


const handleSubmitProduct = async (values, { resetForm }) => {
  try {
    setUploading(true);

    const newImageIds = await uploadImagesToStrapi();
    const existingImageIds = existingImages.map((img) => img.id);

    const finalValues = {
      ...values,
      images: [...existingImageIds, ...newImageIds],
    };

    if (selectedProduct) {
      await updateProduct(selectedProduct.documentId, finalValues); // ✅ await
    } else {
      await addProduct(finalValues); // ✅ await
      resetForm();
      setSelectedFiles([]);
      setPreviewUrls([]);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setUploading(false); 
  }
};
  
  const fetchColors = async () => {
      try{
          const res = await axios.get(url_color, {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            }
          })
          setColors(res.data.data)
      }
      catch(error) {
          console.log(error);
      }
  }

  const addNewColorToSystem = async () => {
    setUploadColor(true)
    try {
      const res = await axios.post(url_color, {data:newColorData}, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        }
      })
      setColors([...colors, res.data.data])
      setUploadColor(false)
      toast.success("Color added to system!")
      setNewColorData({ name: '', hex_code: '', slug: '' });
    } catch (error) {
      console.log(error);
      setUploadColor(false)
      toast.error("Failed to add color. Please try again.")
    }
  }

  const fetchSizes = async () => {
      try{
          const res = await axios.get(url_size, {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            }
          })
          setSizes(res.data.data)
      }
      catch(error) {
          console.log(error);
      }
  }

  const addNewSizeToSystem = async () => {
    setUploadSize(true)
    try {
      const res = await axios.post(url_size, {data: newSizeData}, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        }
      })
      setSizes([...sizes, res.data.data])
      setUploadSize(false)
      toast.success("Size added to system!")
      setNewSizeData({size_value: '', slug: ''})
    } catch (error) {
      toast.error("Failed to add size. Please try again.")
      setUploadSize(false)
      console.log(error);
    }
  }

  const removeColorFromSystem = async (colorId) => {
    try {
      const res = await axios.delete(url_color + "/" + colorId , {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        }
      })
      setColors(colors.filter(c => c.documentId !== colorId))      
    } catch (error) {
      console.log(error);
      
    }
  }

  const removeSizeFromSystem = async (SizeId) => {
    try {
      const res = await axios.delete(url_size + "/" + SizeId , {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        }
      })
      setSizes(sizes.filter(s => s.documentId !== SizeId))      
    } catch (error) {
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

        <Formik initialValues={initialValues} validationSchema={validationSchema} enableReinitialize={true} onSubmit={handleSubmitProduct}>
              <Form className="grid grid-cols-12 gap-8 p-8">  
                <div className="col-span-8 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <label className="flex flex-col gap-2 text-sm font-medium text-primary">
                      Title
                      <Field name="title" className="input" placeholder="Product name" />
                      <ErrorMessage name="title" component={"p"} className="text-red-500"/>
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium text-primary">
                      Price
                      <Field name="price" className="input" type="number" placeholder="Write Product price here..." />
                      <ErrorMessage name="price" component={"p"} className="text-red-500"/>
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <label className="flex flex-col gap-2 text-sm font-medium text-primary">
                      Available quantity
                      <Field name="available_qty" className="input" type="number" />
                      <ErrorMessage name="available_qty" component={"p"} className="text-red-500"/>
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium text-primary">
                      Discount 
                      <Field name="discount" className="input" type="number" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium text-primary">
                      Rate
                      <Field name="rate" className="input" type="number" placeholder="Write Product rate here..." />
                      <ErrorMessage name="rate" component={"p"} className="text-red-500"/>
                    </label>
                  </div>

                  <label className="flex flex-col gap-2 text-sm font-medium text-primary">
                    Details
                    <Field as="textarea" name="details" className="input h-40 resize-none overflow-y-auto" placeholder="Write Product Details here..."/>
                    <ErrorMessage name="details" component={"p"} className="text-red-500"/>
                  </label>

                  {/* images */}
                  <div className="border-2 h-fit border-dashed border-border rounded-lg p-10 flex flex-col items-center justify-center gap-4 bg-gray-50">

                    <input type="file" multiple id="img-upload" className="hidden"  accept="image/*" onChange={handleFileChange} />
                    <label htmlFor="img-upload" className="cursor-pointer bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold">
                        + Add Media (Images)
                    </label>

                  {/* ✅ الصور الموجودة على Strapi */}
                  {existingImages.length > 0 && (
                    <div className="w-full">
                      <p className="text-xs text-gray-400 mb-2">Existing Images</p>
                      <div className="flex flex-wrap gap-3">
                        {existingImages.map((img) => (
                          <div key={img.id} className="relative w-24 h-24 rounded-lg overflow-hidden border border-border">
                            <img src={domain + img.url} alt={img.name} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeExistingImage(img.id)}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-bl-lg p-0.5"
                            >
                              <IoIosClose size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}



                     {/* Preview selected images */}
                    {previewUrls.length > 0 && (
                      <div className="flex flex-wrap gap-3 w-full mt-2">
                        {previewUrls.map((url, index) => (
                          <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-border">
                            <img src={url} alt={`preview-${index}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-bl-lg p-0.5"
                            >
                              <IoIosClose size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                  )}

                  </div>
                </div>

                <div className="col-span-4 space-y-6 bg-gray-50 p-6 rounded-xl border border-border">
                  
                  {/* Stock & Category */}
                  <label className="flex flex-col gap-2 text-sm font-medium text-primary">
                    Stock Status
                    <Field as="select" name="stock_status" className="input">
                      <option value="IN STOCK">IN STOCK</option>
                      <option value="OUT OF STOCK">OUT OF STOCK</option>
                    </Field>
                    <ErrorMessage name="stock_status" component={"p"} className="text-red-500"/>
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-medium text-primary">
                    Category
                    <Field as="select" name="category" className="input">
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.documentId} value={cat.documentId}>{cat.name}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="category" component={"p"} className="text-red-500"/>
                  </label>

                  {/* Colors Section */}

                  {
                    selectedProduct?.category.slug !== "perfumes" && (
                      <div className="space-y-3">
                          <span className="text-sm font-bold text-primary block border-b pb-2">Add New Color</span>
                          <div className="grid grid-cols-2 gap-2">
                            <input onChange={ (e) => setNewColorData({...newColorData, name:e.target.value})} name="name" type="text" value={newColorData.name} className="input h-9 text-[10px]" placeholder="Color Name (Red)" />
                            <input onChange={ (e) => setNewColorData({...newColorData, hex_code:e.target.value})} name="hex_code" type="text" value={newColorData.hex_code}  className="input h-9 text-[10px]" placeholder="HEX (#FF0000)" />
                          </div>
                          <input onChange={ (e) => setNewColorData({...newColorData, slug:e.target.value})} name="slug" type="text" value={newColorData.slug}  className="input h-9 text-[10px]" placeholder="Slug (red)" />
                          
                          <button disabled={!newColorData.name || !newColorData.hex_code || !newColorData.slug} onClick={() => addNewColorToSystem()} type="button" className="disabled:opacity-80 disabled:cursor-not-allowed py-2 btn-animate bg-primary text-white before:bg-white hover:text-primary w-full text-xs font-bold">
                            {
                              uploadColor ? <Spinner /> : <span>+ Add Color to System</span>
                            }
                          </button>
                        <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                          {
                              colors.map( (c) => (
                                  <label key={c.documentId} className="relative flex items-center gap-2 bg-white border border-border pl-2 pr-2.5 py-1 rounded text-xs cursor-pointer">
                                      <Field type="checkbox" name="colors" value={c.documentId} />
                                      {c.slug}
                                  <div className="absolute -top-1.5 -right-1.5">
                                    <IoIosClose onClick={() => removeColorFromSystem(c.documentId)} size={"20"} className="text-red-500" />
                                  </div>
                                  </label>
                              ))
                          }
                        </div>
                      </div>
                    )
                  }

                  {/* Sizes Section */}
                  {
                    selectedProduct?.category.slug !== "perfumes"  && (
                      <div className="space-y-3 pt-2">
                          <span className="text-[11px] font-bold text-primary uppercase tracking-wider block border-b pb-2">New Size Entry</span>
                          <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                  <input onChange={ (e) => setNewSizeData({...newSizeData, size_value:e.target.value})} name="size_value" value={newSizeData.size_value} type="text" className="input h-9 text-[11px]" placeholder="Value (e.g. XL)" />
                                  <input onChange={ (e) => setNewSizeData({...newSizeData, slug:e.target.value})} name="slug" value={newSizeData.slug} type="text" className="input h-9 text-[11px]" placeholder="Slug(xl)" />
                              </div>
                              <button disabled={!newSizeData.size_value || !newSizeData.slug} onClick={() => addNewSizeToSystem()} type="button" className="disabled:opacity-80 disabled:cursor-not-allowed btn-animate bg-primary text-white md:before:bg-white md:hover:text-primary w-full py-2 text-xs font-bold">
                                  {
                                    uploadSize ? <Spinner /> : <span>+ Add Size to System</span>
                                  }
                              </button>
                          </div>
                        <div className="flex flex-wrap gap-2">
                          {sizes.map(s => (
                            <label key={s.documentId} className="cursor-pointer">
                              <Field type="checkbox" name="sizes" value={s.documentId} className="hidden peer" />
                              <div className="relative w-9 h-9 flex items-center justify-center border border-border rounded bg-white text-xs font-bold peer-checked:bg-primary peer-checked:text-white transition-all">
                                {s.slug}
                                <div className="absolute -top-1.5 -right-1.5">
                                  <IoIosClose onClick={() => removeSizeFromSystem(s.documentId)} size={"20"} className="text-red-500" />
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    )
                  }

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

                  <button disabled={uploading} type="submit" className="btn-animate bg-primary text-white md:before:bg-white md:hover:text-primary w-full py-3 font-bold mt-4">
                      {uploading ? selectedProduct ? <Spinner /> : <Spinner /> : selectedProduct ? <span>Update Product</span> : <span>Publish Product</span>}
                  </button>
                </div>

              </Form>
        </Formik>
      </div>
    </div>
  );
};

