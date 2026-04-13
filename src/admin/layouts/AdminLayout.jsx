import { Outlet, useNavigate } from "react-router-dom"
import { SideBar } from "../components/SideBar"
import { useEffect } from "react"
import { useAuthAdmin } from "../../store"

export const AdminLayout = () => {


  const {adminToken} = useAuthAdmin()
  const navigate = useNavigate()



  useEffect( () => {
    if(!adminToken) {
      navigate("/admin/login")
    }
  } ,[adminToken])
  
  return (
    <>
      <div className="flex min-h-screen overflow-hidden">
        <div className="w-65 shrink-0 self-stretch h-auto bg-white shadow-2xl">
            <SideBar />
        </div>
        <div data-lenis-prevent className="grow flex flex-col min-w-0 bg-secondary h-screen overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  )
}