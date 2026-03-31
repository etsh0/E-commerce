import { NavLink, useNavigate } from "react-router-dom"
import { SearchBar } from "../../components/SearchBar"
import { ProductRow } from "../components/ProductRow"
import { useEffect } from "react"
import { useProductStore } from "../../store"

export const Products = () => {
  const {fetchAllProducts, products, setSelectedProduct,resetSelectedProduct} = useProductStore()
  const navigate = useNavigate()
  

  const handleAddProduct = () => {
    resetSelectedProduct()
    navigate("/admin/products/add-product")
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    navigate("/admin/products/add-product")
  }

  useEffect( () => {
    fetchAllProducts()
  } ,[])
  
  return (
    <>
      <div className="bg-secondary px-10">
        <div className="shadow bg-white border border-border px-6 py-8 flex flex-col h-screen">
          <div className="header flex items-center justify-between">
            <h4 className="text-lg text-primary font-semibold">Products</h4>
            <div className="flex gap-4">
                <SearchBar fetchAllProducts={ (value) => fetchAllProducts(value)}/>
                <NavLink to={"add-product"} onClick={handleAddProduct} className="bg-primary py-2.5 px-4 rounded-lg text-sm font-medium text-white cursor-pointer">Add Product</NavLink>
            </div>
          </div>
          <div className="overflow-y-auto grow mt-8">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="text-text border-y border-border">
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">price</th>
                    <th className="px-6 py-4 font-medium">Stock</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Featured</th>
                    <th className="px-6 py-4 font-medium">BestSelling</th>
                    <th className="px-6 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border overflow-auto">
                  {
                    products.map( (product) => (
                      <ProductRow key={product.documentId} product={product} onEdit={() => handleEditProduct(product)}/>
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
