import Search from "../assets/Search.svg"
export const SearchBar = () => {
  return (
    <>
        <div className="search-bar relative ">
            <input type='text' placeholder='Search Products' className=' w-66 pl-11.75 input' />
            <img src={Search} alt="" className='absolute top-[50%] translate-y-[-50%] left-4' />
        </div>
    </>
  )
}
