import { SearchBar } from "../../components/SearchBar"
import { CustomerRow } from "../components/CustomerRow"
import { useAuthAdmin, useCutomersStore } from "../../store"

export const Customers = () => {
  const {adminToken} = useAuthAdmin()
  const {fetchAllUsers,customers} = useCutomersStore()
  
  return (
    <>
      <div className='bg-secondary px-10'>
        <div className="shadow bg-white border border-border px-6 py-8 flex flex-col h-screen">
            <div className="header flex items-center justify-between">
              <h4 className="text-lg text-primary font-semibold">Cutomers</h4>
              <SearchBar fetchAllUsers={ (searchQuery) => fetchAllUsers(adminToken,searchQuery)} />
            </div>
          <div className="overflow-y-auto grow mt-8">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="text-text border-y border-border">
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium">Joined Date</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border overflow-auto">
                  {
                    customers.map( (user) => (
                      <CustomerRow key={user.documentId} user={user} fetchCustomers={() => fetchAllUsers(adminToken, "")}/>
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
