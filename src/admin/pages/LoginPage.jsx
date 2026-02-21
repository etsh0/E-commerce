import Logo from "../../assets/Admin_logo.svg"
export const LoginPage = () => {
  return (
    <>
        <div className="flex items-center justify-center bg-secondary h-dvh">
            <div className="bg-white shadow-2xl border border-border rounded-lg py-6 px-4 w-110">
                <div className="image flex justify-center">
                    <img src={Logo} alt="" />
                </div>
                <form action="" className="flex flex-col gap-8 mt-10">
                    <label className="flex flex-col gap-2 text-sm font-medium text-[#474B57]" htmlFor="">
                        Email
                        <input className="input" type="email" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium text-[#474B57]" htmlFor="">
                        Password
                        <input className="input" type="password" />
                    </label>
                    <button className="bg-primary text-white py-3 rounded text-sm font-medium cursor-pointer">Login</button>
                </form>
            </div>
        </div>
    </>
  )
}
