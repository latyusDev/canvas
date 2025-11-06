import React from 'react'
import { Skeleton } from './ui/skeleton'

const DesignLoaders = () => {
  return (
    <div className='flex flex-col md:flex-row gap-4'>
        <Skeleton className={'flex-[0.25] h-[240px] rounded-md'}/>
        <Skeleton className={'flex-[0.25] h-[240px] rounded-md'}/>
        <Skeleton className={'flex-[0.25] h-[240px] rounded-md'}/>
        <Skeleton className={'flex-[0.25] h-[240px] rounded-md'}/>
    </div>
  )
}

export default DesignLoaders