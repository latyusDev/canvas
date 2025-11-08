'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import{ Search, Sparkles } from 'lucide-react'
import DesignLists from './DesignLists'
import { getUserDesigns, searchDesigns } from '@/services/design-service'
import { useQuery } from '@tanstack/react-query'
import DesignLoaders from '../DesignLoaders'
import { Input } from '../ui/input'

const DesignSearchModal = ({isSearchModal,setIsSearchModal}) => {
  const [searchData,setSearchData] = useState('')
  
   const {data,isLoading,error,isError} = useQuery({
          queryKey:['searchDesigns',searchData],
          queryFn:async()=>await searchDesigns(searchData),
          refetchOnWindowFocus:false,
          staleTime:1000*60*10
        })
        console.log(error,'error')
        console.log(isError)

  return (
    
          <Dialog open={isSearchModal} onOpenChange={setIsSearchModal} className={'relative z-50'}>
                  <DialogContent className={'sm:max-w-[1200px] p-5 gap-0 h-[550px] overflow-y-auto'}>
                   <DialogTitle>
                     <div className="flex-1 w-full mt-8 md:mt-0 md:w-[700px]  mx-auto relative">
                      <Search className='absolute top-7 left-3  transform -translate-y-1/2 h-5 w-5 text-gray-400'/>
                      <Input
                      onChange={(e)=>setSearchData(e.target.value)}
                      defaultValue={searchData}
                      className='pl-10 py-6 border-gray-200 w-full  bg-gray-50 focus-visible:ring-purple-500'
                      placeholder='Search your projects and canvas'  />
                  </div>
                   </DialogTitle>
                    {
                     isLoading?<DesignLoaders/>:
                          isError ? <h1 className='text-center  text-xl py-20 shadow-md rounded-lg'>
                                kindly search for your designs
                          </h1>:
                              <div className='mt-5'>
                                  <div className='text-2xl font-bold mb-4 flex items-center'>
                                    <Sparkles className='h-6 w-6 text-yellow-500 mr-2' />
                                    <p>Search results</p>
                                </div>
                              {
                                data?.data.length === 0 ?
                                  <h1 className='text-center mt-3'>Ni design found</h1>:
                                <DesignLists userDesigns={data.data} 
                                setDesignShowModal={setIsSearchModal}/>
                              }
                              </div>
                        }

            </DialogContent>
        </Dialog>
  )
}

export default DesignSearchModal