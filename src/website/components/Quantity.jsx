import React from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'

export const Quantity = () => {
  return (
    <>
        <div className='border-2 border-border px-4 py-1 rounded-lg w-fit flex items-center gap-6'>
            <button className='decrease text-text cursor-pointer'><FiMinus /></button>
            <div className='number'>1</div>
            <button className='increase text-text cursor-pointer'><FiPlus /></button>
        </div>
    </>
  )
}
