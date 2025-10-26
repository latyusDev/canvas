'use client';
import Link from 'next/link';
import React from 'react'
import DesignPreview from './DesignPreview';
import { useEditorStore } from '@/store/useEditorStore';
import DesignLists from './DesignLists';
import { useQuery } from '@tanstack/react-query';
import { getUserDesigns } from '@/services/design-service';
import DesignLoaders from '../DesignLoaders';

const RecentDesigns = () => {
    //   const {userDesigns} = useEditorStore();
      const {data,isLoading,error} = useQuery({
        queryKey:['designs'],
        queryFn:getUserDesigns,
        refetchOnWindowFocus:false,
        staleTime:1000*60*10
      })
     
   
  return (
    <div>
        <h2 className='text-xl font-bold mb-4'>Recent Designs</h2>
       {
        isLoading?<DesignLoaders/>: <div>
             {
                    data?.data.length == 0 ? <div>
                    <h1 className='text-center mt-4 text-lg'>No design found</h1>
                    </div>: <DesignLists userDesigns={data?.data.slice(0,4)}/>
            }

            {/* </div>: <DesignLists userDesigns={userDesigns?.length>0?userDesigns.slice(0,4):[]}/> */}
        </div>
       }
    </div>
  )
}

export default RecentDesigns