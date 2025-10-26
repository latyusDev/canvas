import { designTypes } from '@/config'
import React from 'react'

const DesignTypes = () => {
  return (
    <div className='grid grid-cols-4 sm:grid-cols-8 md:grid-cols-10 gap-4 mt-12 justify-center'> 
    {
        designTypes.map(type=>{
            return(
                <div key={type.id} className='flex flex-col items-center'>
                    <div className={`${type.bgColor} w-14 h-14 rounded-full flex items-center justify-center mb-2`}>
                        {type.icon}
                    </div>
                    <span className='text-xs text-center'>{type.label}</span>

                </div>
            )
        })
    }

    </div>
  )
}

export default DesignTypes