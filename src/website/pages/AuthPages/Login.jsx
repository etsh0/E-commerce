import { Link } from "react-router-dom"
import Google from "../../../assets/Google.svg"

export const Login = () => {
  return (
    <>
        <div className='flex items-center justify-center w-full h-full py-10'>
            <div className='w-120 flex flex-col gap-6'>
                <div className='border-2 border-border w-full flex items-center justify-center gap-4 py-2 rounded cursor-pointer'>
                    <img src={Google} alt="" />
                    <p className="text-sm text-text">Continue with Google</p>
                </div>
                <div className="uppercase text-text text-center">or</div>
                <form action="" className="flex flex-col gap-6 w-full">
                    <label className="flex flex-col gap-2 text-sm text-[#474B57]" htmlFor="">
                        Full Name
                        <input className="input" type="text" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-[#474B57]" htmlFor="">
                        Email
                        <input className="input" type="email" />
                    </label>
                    <button className="text-sm text-text font-medium self-end"><Link>Forgot Password?</Link></button>
                    <button className="bg-primary text-white px-4 py-2 rounded font-medium cursor-pointer">Login</button>
                </form>
                <p className="text-sm text-text text-center">Don't have an account? <Link to={"/register"}>Sign Up</Link></p>
            </div>
        </div>
    </>
  )
}
