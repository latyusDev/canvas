'use client';


import { saveDesign } from '@/services/design-service'
import { useEditorStore } from '@/store/useEditorStore';
import { CreditCard, FolderOpen, Home, Plus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Sidebar = () => {
      const [loading,setLoading] = useState(false);
      const router = useRouter();
      const {setShowPremiumModal,showPremiumModal} = useEditorStore();


      const handleCreateNewDesign = async()=>{

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
      const handleBilling = (value)=>{
        if(value === 'Billing'){
            setShowPremiumModal(true)
            console.log(value)
        }
      }
  return (
    <aside  className='w-[72px] bg-[#f8f8fc] border-r flex flex-col items-center py-4 fixed left-0 top-0 h-full z-20'>
    <div onClick={handleCreateNewDesign} className='flex flex-col items-center'>
        <button className='w-12 h-12 bg-purple-600 rounded-full flex justify-center
         items-center text-white hover:bg-purple-700 transition-colors'>
            <Plus className='w-6 h-6'/>
        </button>
        <div className='text-xs font-medium text-center mt-1 text-gray-700'>
            create
        </div>
    </div>
    <nav className="mt-8 flex flex-col items-center w-full space-y-full">
        {
            [
                {
                    icon:<Home className='h-6 w-6'/>,label:'Home',active:true
                },
                {
                    icon:<FolderOpen className='h-6 w-6'/>,label:'Projects',active:false
                },
                {
                    icon:<CreditCard className='h-6 w-6'/>,label:'Billing',active:false
                }
            ].map((menuItem,index)=>{
                return ( 
                    <div onClick={()=>handleBilling(menuItem.label)} key={index} className='flex flex-col items-center cursor-pointer w-full'>
                        <div 
                            className='w-full flex flex-col items-center py-2 text-gray-600 hover:bg-gray-100 hover:text-purple-600'>
                                <div className='reletive'>
                                    {menuItem.icon}
                                </div>
                                <span className='text-xs font-medium mt-1'>{menuItem.label}</span>
                            </div>
                    </div>
                )    
            })
        }
    </nav>
    </aside>
  )
}

export default Sidebar