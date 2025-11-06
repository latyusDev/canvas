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
      const {data,isLoading,error,isError} = useQuery({
        queryKey:['designs'],
        queryFn:getUserDesigns,
        refetchOnWindowFocus:false,
        staleTime:1000*60*10
      })
      console.log(error,'error')
     
   
  return (
    <div>
        <h2 className='text-xl font-bold mb-4'>Recent Designs</h2>
       {
        isLoading?
        <DesignLoaders/>:
         isError ? <h1 className='text-center  text-xl py-20 shadow-md rounded-lg'>
          Your session has expired,kindly login again
        </h1>:
        <div>
             {
                    data?.data.length == 0 ? <div>
                    <h1 className='text-center mt-4 text-lg'>No design found</h1>
                    </div>: <DesignLists userDesigns={data?.data.slice(0,4)}/>
            }
        </div>
       }
    </div>
  )
}

export default RecentDesigns