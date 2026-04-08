import { useState } from "react"
import { SearchBar } from "../../components/SearchBar"
import { CategoryRow } from "../components/CategoryRow"
import { MdClose } from "react-icons/md"
import { useCategoriesStore } from "../../store"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Spinner } from "../../components/Spinner"
import * as Yup from "yup";


export const Categories = () => {
  const [modalIsOpen,setModalIsOpen] = useState(false)
  const {categories, addCategory, upadteCategory, isLoading} = useCategoriesStore()

  const [selectedCategory, setselectedCategory] = useState(null)

  const handleEditClick = (category) => {
    setselectedCategory(category)
    setModalIsOpen(true)
  }

  const handleAddClick = () => {
    setselectedCategory(null)
    setModalIsOpen(true)
  }

  const initialValues = {
    name:selectedCategory?.name || '',
    slug:selectedCategory?.slug || ''
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Category name is required"),
    slug: Yup.string().required("URL slug is required")
  })

  const handleSubmitCategory =  async (values, { resetForm }) => {

    if(selectedCategory) {
      await upadteCategory(selectedCategory.documentId , values)
    }else {
      await addCategory(values);
      resetForm()
    }
    setModalIsOpen(false)
  };


  return (
    <>
      <div className="bg-secondary px-10">
        <div className="shadow bg-white border border-border px-6 py-8 flex flex-col h-screen">
          <div className="header flex items-center justify-between">
            <h4 className="text-lg text-primary font-semibold">Categories</h4>
            <div className="flex gap-4">
                <SearchBar />
                <button className="bg-primary py-2.5 px-4 rounded-lg text-sm font-medium text-white cursor-pointer" onClick={handleAddClick}>Add Category</button>
            </div>
          </div>
          <div className="overflow-y-auto grow mt-8">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="text-text border-y border-border">
                    <th className="px-6 py-4 font-medium">Category Name</th>
                    <th className="px-6 py-4 font-medium">URL Slug</th>
                    <th className="px-6 py-4 font-medium">Products Count</th>
                    <th className="px-6 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border overflow-auto">
                  {
                    categories.map( (cat) => (
                      <CategoryRow key={cat.documentId} category={cat} onEdit={() => handleEditClick(cat)}/>
                    ))
                  }
                </tbody>
              </table>
          </div>
        </div>
        {
          modalIsOpen && (
            <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white shadow border border-border w-full max-w-lg relative rounded-lg p-8">
                  <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{selectedCategory ? "Edit Category" : "Add Category"}</h3>
                  <MdClose size={"20px"} className="cursor-pointer" onClick={() => setModalIsOpen(false)} />
                  </div>
                  <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmitCategory} enableReinitialize={true}>
                    <Form action="" className="flex flex-col gap-4 py-6">
                      <label className="flex flex-col gap-2 text-sm font-medium text-primary" htmlFor="">
                          Category Name
                          <Field name='name' className="input" type="text" />
                          <ErrorMessage name="name" component={"p"} className="text-red-500"/>
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-medium text-primary" htmlFor="">
                          URL Slug
                          <Field name='slug' className="input" type='text'></Field>
                          <ErrorMessage name="slug" component={"p"} className="text-red-500"/>
                      </label> 
                      <button type="submit" className="bg-primary flex items-center justify-center text-white w-full py-2 rounded cursor-pointer whitespace-nowrap mt-6">
                        {
                          isLoading ? <Spinner />: selectedCategory ? "Update Category" : "Add Category"
                        }
                      </button>
                    </Form>
                  </Formik>
              </div>
          </div>
          )
        }
      </div>    
    </>
  )
}
