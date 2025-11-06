import { designTypes } from '@/config'
import { saveDesign } from '@/services/design-service';
import { useEditorStore } from '@/store/useEditorStore'
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

const DesignTypes = () => {
    const {userDesigns,userSubscription} = useEditorStore();
    const [currentSelectedType,setCurrentSelectedType] = useState(null)
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    

     const handleCreateNewDesign = async(type,index)=>{
      setCurrentSelectedType(index)
      if(userDesigns.length>=5&&!userSubscription.isPremium){
         
        toast.error("Please upgrade to premium", {
          description: "You need to upgrade to premium to create more designs",
        })
        return 
      }

      if(loading){
          return ;
      }
      try{
        setLoading(true)
          const initialDesignData = {
            name:type.label,
            canvasData:null,
            width:type.width,
            height:type.height,
            category:type.label
          }
          
          const newDesign = await saveDesign(initialDesignData)
          if(newDesign?.success){
              router.push(`/editor/${newDesign.data._id}`)
            setLoading(false)
          }else{
            throw new Error('Failed to create new design')

          }
      }catch(e){
            setLoading(false)
            console.log(e)
      }

  }
  return (
    <div className='grid grid-cols-4 sm:grid-cols-8 md:grid-cols-10 gap-4 mt-12 justify-center'> 
    {
        designTypes.map((type,index)=>{
            return(
                <div onClick={()=>handleCreateNewDesign(type,index)} key={type.id} className='flex flex-col items-center cursor-pointer'>
                    <div className={`${type.bgColor} w-14 h-14 rounded-full flex items-center justify-center mb-2`}>
                        {type.icon}
                    </div>
                    <span className='text-xs flex gap-2 text-center'> 
                       {loading&&index===currentSelectedType&&<Loader className='w-4 h-4'/>}
                      {type.label}</span>

                </div>
            )
        })
    }

    </div>
  )
}

export default DesignTypes