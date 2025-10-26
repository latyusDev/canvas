'use client'
import React from 'react'
import DesignPreview from './DesignPreview'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { deleteDesign } from '@/services/design-service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const DesignLists = ({userDesigns}) => {
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
    mutationFn: async (id) => await deleteDesign(id), 
    onMutate: async (id) => {
    await queryClient.cancelQueries({ queryKey: ['designs'] })
    const previousDesigns = queryClient.getQueryData(['designs'])
    console.log('Previous designs:', previousDesigns)
    queryClient.setQueryData(['designs'], (old) => {
        if (!Array.isArray(old)) return old;
            return old.filter((design) => design.id !== id);
        });
    return { previousDesigns }
  },
  onSuccess:(response)=>{
        console.log(response)
        if(response.success){
            toast.message("Deleting...", {
          description: "Design deleted successfully",
        })
        }
  },
  onError: (err, id, context) => {
    console.error('Delete failed:', err)
    if (context?.previousDesigns) {
      queryClient.setQueryData(['designs'], context.previousDesigns)
    }
  },

  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['designs'] })
  },
})

    const handleDeleteDesign = async(id)=>{
        mutate(id)
    }
  return (
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {
                userDesigns.map(design=>{
                    return (
                       <div  key={design._id}  className='group cursor-pointer'>
                        <Link href={`/editor/${design._id}`}>
                             <div key={design._id} >
                           <div className='w-[300px] h-[300px] rounded-lg overflow-hidden mb-2  transition-shadow group-hover:shadow-md'>
                            {
                                design?.canvasData&&<DesignPreview key={design._id} design={design}/>
                            }
                           </div>
                        </div>
                       </Link>
                        <div className='flex justify-between px-4'>
                            <p className='font-bold text-sm truncate'> {design.name}</p>
                            <Trash2 onClick={()=>handleDeleteDesign(design._id)} className='w-5 h-5 text-red-600'/>
                        </div>
                       </div>
                    )
                })
            }
        </div>
  )
}

export default DesignLists