import axios from "axios"
import { domain, useAuthAdmin } from "../../store"
import toast from "react-hot-toast"

export const CustomerRow = ({user,fetchCustomers}) => {

    const {adminToken} = useAuthAdmin()

    const handleBlockUser = async (userId, currentStatus) => {
        let url = domain + `/api/users/${userId}`
        try {
            const res = await axios.put(url,{
                blocked: !currentStatus
            },
            {
                headers: {Authorization: `Bearer ${adminToken}`}
            }
        )
            toast.success(currentStatus ? "User Unblocked" : "User Blocked");
            fetchCustomers()
        } catch (error) {
            console.log(error);
        }
    }
    return (
    <>
        <tr className="text-gray-600 text-sm hover:bg-gray-50 transition">
            <td className="px-6 py-4 font-medium text-gray-800 line-clamp-1 flex items-center gap-4">
                <div className="bg-secondary text-[#4078FF] px-4 py-3 rounded">{user.username.slice(0,2).toUpperCase()}</div>
                <span>{user.username}</span>
            </td>
            <td className="px-6 py-4">{user.email}</td>
            <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString('en-GB')}</td>
            <td className="px-6 py-4">
                {user.blocked ? (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                        Blocked
                    </span>
                ) : (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                        Active
                    </span>
                )}
            </td>
            <td className="px-6 py-4">
                <button onClick={ () => handleBlockUser(user.id, user.blocked)} className="text-red-500 hover:text-red-700 text-sm font-semibold transition cursor-pointer">
                    {user.blocked ? 'Unblock' : 'Block'}
                </button>
            </td>
        </tr>
    </>
  )
}
