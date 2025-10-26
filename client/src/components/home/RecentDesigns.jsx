'use client';
import Link from 'next/link';
import React from 'react'
import DesignPreview from './DesignPreview';
import { useEditorStore } from '@/store/useEditorStore';
import DesignLists from './DesignLists';

const RecentDesigns = () => {
      const {userDesigns} = useEditorStore();
   
  return (
    <div>
        <h2 className='text-xl font-bold mb-4'>Recent Designs</h2>
        {
            userDesigns.length == 0 ? <div>
                    <h1>No design found</h1>
            </div>: <DesignLists userDesigns={userDesigns?.length>0?userDesigns.slice(0,4):[]}/>

        }

    </div>
  )
}

export default RecentDesigns