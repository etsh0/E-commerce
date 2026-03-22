import { useEffect, useState } from "react"
import { SearchBar } from "../../components/SearchBar"
import { CategoryRow } from "../components/CategoryRow"
import { MdClose } from "react-icons/md"
import { useCategoriesStore } from "../../store"
import { Field, Form, Formik } from "formik"


export const Categories = () => {
  const [modalIsOpen,setModalIsOpen] = useState(false)
  const {categories, fetchCategories, addCategory} = useCategoriesStore()

  useEffect( () => {
    fetchCategories()    
  } ,[])
  
  const initialValues = {
    name:'',
    slug:''
  }

  const handleSubmitCategory =  (values, { resetForm }) => {
    addCategory(values);
    setModalIsOpen(false)
    resetForm()
  };

  return (
    <>
      <div className="bg-secondary px-10">
        <div className="shadow bg-white border border-border px-6 py-8 flex flex-col h-screen">
          <div className="header flex items-center justify-between">
            <h4 className="text-lg text-primary font-semibold">Categories</h4>
            <div className="flex gap-4">
                <SearchBar />
                <button className="bg-primary py-2.5 px-4 rounded-lg text-sm font-medium text-white cursor-pointer" onClick={ () => setModalIsOpen(true) }>Add Category</button>
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
                      <CategoryRow key={cat.documentId} category={cat} />
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
                  <h3 className="text-xl font-semibold">Add Category</h3>
                  <MdClose size={"20px"} className="cursor-pointer" onClick={() => setModalIsOpen(false)} />
                  </div>
                  <Formik initialValues={initialValues} onSubmit={handleSubmitCategory}>
                    <Form action="" className="flex flex-col gap-4 py-6">
                      <label className="flex flex-col gap-2 text-sm font-medium text-primary" htmlFor="">
                          Category Name
                          <Field name='name' className="input" type="text" />
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-medium text-primary" htmlFor="">
                          URL Slug
                          <Field name='slug' className="input" type='text'></Field>
                      </label> 
                      <button type="submit" className="bg-primary flex items-center justify-center text-white w-full py-2 rounded cursor-pointer whitespace-nowrap mt-6">Add Category</button>
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
