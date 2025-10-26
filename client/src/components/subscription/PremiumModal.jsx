'use client'
import React from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { useEditorStore } from '@/store/useEditorStore'
import { DialogTitle } from '@radix-ui/react-dialog'
import { CheckCircle, Clock, Crown, Palette, Sparkles } from 'lucide-react'
import { Button } from '../ui/button'

const PremiumModal = ({isOpen,onClose}) => {
    const {userSubscription} = useEditorStore();

    const handleUpgrade = async()=>{

    }
  return (
        <Dialog open={isOpen} onOpenChange={onClose} className={'relative z-50'}>
            <DialogContent className={'sm:max-w-[900px] p-0 gap-0 overflow-hidden'}>
                <div className='flex flex-col md:flex-row'>
                    <div className="p-6 flex-1">
                        {
                            userSubscription?.isPremium?(
                               <div>
                                <DialogTitle className='text-2xl font-bold mb-4 flex items-center'>
                                    <Sparkles className='h-6 w-6 text-yellow-500 mr-2' />
                                    <p>You are a premium member</p>
                                </DialogTitle>
                                <div className='bg-green-50 border border-green-100 rounded-lg p-4 mb-6'>
                                    <div className='flex items-center'>
                                        <CheckCircle className='h-5 w-5 text-green-500 mr-2'/>
                                        <p className='text-green-700'>Premium active since {userSubscription?.premiumSince||'recently'}</p>
                                    </div>
                                </div>
                                <p className='text-sm mb-6'>
                                    Enjoy all premium features and benefits
                                </p>
                                <div className='space-y-4'>
                                    <div className='flex items-start gap-3 bg-white rounded-lg border p-3 '>
                                        <Crown className='h-5 w-5 text-primary mr-0.5'/>
                                        <div>
                                            <p className='font-medium capitalize'> premium contents</p>
                                            <p className='text-sm text-muted-foreground'>Access to all premium templates and assets</p>
                                        </div>
                                    </div>
                                    <div className='flex items-start gap-3 bg-white rounded-lg border p-3 '>
                                        <Palette className='h-5 w-5 text-primary mr-0.5'/>
                                        <div>
                                            <p className='font-medium capitalize'>brand tools</p>
                                            <p className='text-sm text-muted-foreground'>Create and maintain consistent brand identity</p>
                                        </div>
                                    </div>
                                    <div className='flex items-start gap-3 bg-white rounded-lg border p-3 '>
                                        <Clock className='h-5 w-5 text-primary mr-0.5'/>
                                        <div>
                                            <p className='font-medium capitalize'> premium contents</p>
                                            <p className='text-sm text-muted-foreground'>Time-saving tools for professional designs</p>
                                        </div>
                                    </div>
                                </div>
                               </div>
                            ):(
                                <div>
                                    <DialogTitle className='text-2xl font-bold mb-4 '>
                                    <p className='capitalize'>Upgrade to Canva premium</p>
                                    </DialogTitle>
                                    <p className='text-sm mb-4'>
                                        Upgrade to <span className='font-semibold'>Canvas Premium and create quality designs together</span>
                                    </p>
                                      <div className='space-y-4'>
                                    <div className='flex items-start gap-3 bg-white rounded-lg border p-3 '>
                                        <Crown className='h-5 w-5 text-primary mr-0.5'/>
                                        <div>
                                            <p className='font-medium capitalize'> premium contents</p>
                                            <p className='text-sm text-muted-foreground'>Access to all premium templates and assets</p>
                                        </div>
                                    </div>
                                    <div className='flex items-start gap-3 bg-white rounded-lg border p-3 '>
                                        <Palette className='h-5 w-5 text-primary mr-0.5'/>
                                        <div>
                                            <p className='font-medium capitalize'>brand tools</p>
                                            <p className='text-sm text-muted-foreground'>Create and maintain consistent brand identity</p>
                                        </div>
                                    </div>
                                    <div className='flex items-start gap-3 bg-white rounded-lg border p-3 '>
                                        <Clock className='h-5 w-5 text-primary mr-0.5'/>
                                        <div>
                                            <p className='font-medium capitalize'> premium contents</p>
                                            <p className='text-sm text-muted-foreground'>Time-saving tools for professional designs</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-6 space-y-2 '>
                                    <Button className={'w-full bg-purple-600 hover:bg-purple-700'} onClick={handleUpgrade}>
                                        Upgrade

                                    </Button>
                                </div>
                                </div>

                            )
                        }
                    </div>
                <div className='hidden md:block md:w-[450px]'>
                    <img src="data:image/png;base64,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" alt="Team collaboration" className='w-full h-full object-cover' />
                    Right content
                </div>
                </div>
               

            </DialogContent>

        </Dialog>
  )
}

export default PremiumModal