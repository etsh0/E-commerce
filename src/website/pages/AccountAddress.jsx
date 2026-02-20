import { AccountHeader } from "../components/AccountHeader"

export const AccountAddress = () => {
  return (
    <>
        <div className="">
            <AccountHeader title={"Shipping Address"} />
            <form className="max-w-155 flex flex-col gap-4 mb-10" action="">
                <label className="flex flex-col gap-2 text-sm text-[#474B57]" htmlFor="">
                    Street Address
                    <input className="input" type="text" defaultValue={"Dokki Street"} />
                </label>
                <div className="flex flex-col lg:flex-row gap-4 ">
                    <label className="flex flex-col gap-2 text-sm text-[#474B57] w-full" htmlFor="">
                        City
                        <input className="input" type="text" defaultValue={"Cairo"} />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-[#474B57] w-full" htmlFor="">
                        State
                        <input className="input" type="text"  defaultValue={"EG"}/>
                    </label>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 ">
                    <label className="flex flex-col gap-2 text-sm text-[#474B57] w-full" htmlFor="">
                        Zip Code
                        <input className="input" type="text" defaultValue={"00000"} />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-[#474B57] w-full" htmlFor="">
                        Country
                        <input className="input" type="text" defaultValue={"Egypt"} />
                    </label>
                </div>
            </form>
            <button className="bg-primary text-white px-4 py-2 rounded text-sm font-medium cursor-pointer">Save Changes</button>
        </div>
    </>
  )
}
