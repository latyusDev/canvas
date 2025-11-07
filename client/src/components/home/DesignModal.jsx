'use client'
import React from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import{ Sparkles } from 'lucide-react'
import DesignLists from './DesignLists'
import { getUserDesigns } from '@/services/design-service'
import { useQuery } from '@tanstack/react-query'
import DesignLoaders from '../DesignLoaders'

const DesignModal = ({isOpen,onClose,userDesigns,setDesignShowModal}) => {
  
   const {data,isLoading,error,isError} = useQuery({
          queryKey:['designs'],
          queryFn:getUserDesigns,
          refetchOnWindowFocus:false,
          staleTime:1000*60*10
        })
        console.log(error,'error')
        console.log(isError)

  return (
    
          <Dialog open={isOpen} onOpenChange={onClose} className={'relative z-50'}>
                  <DialogContent className={'sm:max-w-[1200px] p-5 gap-0 h-[550px] overflow-y-auto'}>
                    {
                     isLoading?<DesignLoaders/>:
                          isError ? <h1 className='text-center  text-xl py-20 shadow-md rounded-lg'>
                            Your session has expired,kindly login again
                          </h1>:
                              <div>
                                  <DialogTitle className='text-2xl font-bold mb-4 flex items-center'>
                                    <Sparkles className='h-6 w-6 text-yellow-500 mr-2' />
                                    <p>All designs</p>
                                </DialogTitle>
                              {
                                data?.data.length === 0 ?
                                  <h1 className='text-center mt-3'>You have not created any designs</h1>:
                                <DesignLists userDesigns={data.data} 
                                setDesignShowModal={setDesignShowModal}/>
                              }
                              </div>
                        }

            </DialogContent>
        </Dialog>
  )
}

export default DesignModal