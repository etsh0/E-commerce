import React from 'react'

export const Colors = () => {
  return (
    <div className="colors">
        <div className="flex items-center gap-4 mt-4">
            <div className="p-1 border rounded-full cursor-pointer">
                <div className="circle w-6 h-6 bg-[#A3BEF8] rounded-full"></div>
            </div>
            <div className="p-1 rounded-full cursor-pointer">
                <div className="circle w-6 h-6 bg-[#FFD58A] rounded-full"></div>
            </div>
            <div className="p-1 rounded-full cursor-pointer">
                <div className="circle w-6 h-6 bg-[#83B18B] rounded-full"></div>
            </div>
            <div className="p-1 rounded-full cursor-pointer">
                <div className="circle w-6 h-6 bg-[#4078FF] rounded-full"></div>
            </div>
        </div>  
    </div>
  )
}
