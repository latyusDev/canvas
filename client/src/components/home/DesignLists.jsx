'use client'
import React from 'react'
import DesignPreview from './DesignPreview'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'

const DesignLists = ({userDesigns}) => {
  return (
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {
                userDesigns.map(design=>{
                    return (
                       <Link key={design._id} href={`/editor/${design._id}`} className='group cursor-pointer'>
                             <div key={design._id} >
                           <div className='w-[300px] h-[300px] rounded-lg overflow-hidden mb-2  transition-shadow group-hover:shadow-md'>
                            {
                                design?.canvasData&&<DesignPreview key={design._id} design={design}/>
                            }
                           </div>
                        </div>
                        <div className='flex justify-between px-4'>
                            <p className='font-bold text-sm truncate'> {design.name}</p>
                            <Trash2 className='w-5 h-5 text-red-600'/>
                        </div>
                       </Link>
                    )
                })
            }
        </div>
  )
}

export default DesignLists