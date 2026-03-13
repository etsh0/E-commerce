import { FiMinus, FiPlus } from 'react-icons/fi'

export const Quantity = ({qty, Decrement, Increment}) => {
  return (
    <>
        <div className='border-2 border-border px-4 py-1 rounded-lg w-fit flex items-center gap-6'>
            <button onClick={Decrement} className='decrease text-text cursor-pointer'><FiMinus /></button>
            <div className='number'>{qty}</div>
            <button onClick={Increment} className='increase text-text cursor-pointer'><FiPlus /></button>
        </div>
    </>
  )
}
