'use client'
import React from 'react'
import { Button } from '../ui/button'
import { LogIn } from 'lucide-react'
import { signIn } from 'next-auth/react'

const LoginCard = () => {
  return (
    <div className='bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4 transition-all duration-300'>
        <div className='space-y-8 '>
           <div className='text-center mb-5 '>
             <h3 className='text-2xl font-bold text-gray-800'>Jump back in!</h3>
            <p className='text-gray-500 mt-3'>sign in to continue to Canva</p>
           </div>
        </div>
        <Button variant={'outline'}
        onClick={()=>signIn('google',{callbackUrl:'/'})}
        className={`w-full flex items-center justify-center gap-3 py-6 text-gray-700 border-gray-300
        hover:'border-[#8b3dff] hover:text-[#8b3dff] transition-all duration-300 group transform hover:scale-[1.0] active:scale-[0.99]`}>
            <div className='bg-white rounded-full p-1 flex items-center justify-center group-hover:[#8b3dff]/10 transition-colors duration-300'>
                <LogIn className='w-5 h-5 group-hover:text-[#8b3dff] transition-colors duration-300'/>
            </div>
            <span className='font-medium'>Continue with Google</span>
        </Button>
    </div>
  )
}


export default LoginCard