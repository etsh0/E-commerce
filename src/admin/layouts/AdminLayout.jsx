import { Outlet } from "react-router-dom"
import { SideBar } from "../components/SideBar"

export const AdminLayout = () => {
  return (
    <>
      <div className="flex h-dvh">
        <div className="w-65 h-full bg-white shadow-2xl">
            <SideBar />
        </div>
        <div className="grow h-full bg-secondary">
          <Outlet />
        </div>
      </div>
    </>
  )
}
