
import { saveDesign } from '@/services/design-service'
import {  getUserSubscription } from '@/services/subscription-service';
import { useEditorStore } from '@/store/useEditorStore';
import { Crown, Loader } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {toast} from 'sonner';
import { Button } from '../ui/button';

const Banner = () => {
  const [loading,setLoading] = useState(false);
  const router = useRouter()
  const {userSubscription,userDesigns} = useEditorStore();
  console.log(userSubscription)

  const handleCreateNewDesign = async()=>{
      if (loading) return;
      console.log(userDesigns,)
      if(userDesigns.length>=5&&!userSubscription.isPremium){
         
        toast.error("Please upgrade to premium", {
          description: "You need to upgrade to premium to create more designs",
        })
        return 
      }
  


      try{
          setLoading(true)
          const initialDesignData = {
            name:'Untitle design - Youtube Thumbnail',
            canvasData:null,
            width:825,
            height:465,
            category:'youtube_thumbnail'
          }
          
          const newDesign = await saveDesign(initialDesignData)
          setLoading(false)
          if(newDesign?.success){
              router.push(`/editor/${newDesign.data._id}`)

          }else{
            throw new Error('Failed to create new design')
          }
      }catch(e){
          console.log(e)
      }

  }

  
  return (
    <div className='rounded-xl overflow-hidden bg-gradient-to-r from-[#00c4cc] via-[#8b3dff] to-[#5533ff] text-white p-4 sm:p-6 md:p-8 text-center'>
        <div className="flex flex-col items-center sm:flex-row justify-center mb-2 sm:mb-4">
            <Crown className='h-8 w-8 sm:w-10 md:h-12 md:w-12 text-yellow-300 '/>
            <span className='sm:ml-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight'>Create Innovative Designs</span>
        </div>
        <h2 className='text-sm sm:text-base md:text-lg font-bold mb-4 max-w-2xl mx-auto'>Design eye-catching thumbnails that get more viewers</h2>
        <div onClick={handleCreateNewDesign} 
        className="text-[#8b3dff] flex gap-2 items-center w-[max-content] mx-auto bg-white hover:bg-gray-100 rounded-lg cursor-pointer px-4
         py-2 sm:px-6 sm:py-2.5"><span>Start Designing</span> {loading&&<Loader className='w-4 h-4'/>}  </div>
    
    </div>
  )
}

export default Banner