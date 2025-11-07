// 'use client';

import { LogOut, Search } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import DesignSearchModal from './DesignSearchModal';


const Header = () => {
  const [isSearchModal,setIsSearchModal] = useState(false)
    const {data:session} = useSession();
    const handleLogout = async()=>{
        await signOut({ 
        callbackUrl: '/login' // Redirect to login page
    });
    }
  return (
    <header className='h-16 border-b border-gray-200 bg-white flex items-center px-6 top-0 right-0 left-[72px] z-10'>
  <div className="flex-1 max-w-2xl mx-auto relative">
            <Search className='absolute top-1/2 left-3  transform -translate-y-1/2 h-5 w-5 text-gray-400'/>
            <Input 
            onClick={()=>setIsSearchModal(true)}
            className='pl-10 py-6 border-gray-200 bg-gray-50 focus-visible:ring-purple-500'
            placeholder='Search your projects and canvas'  />

        </div>
        <DesignSearchModal isSearchModal={isSearchModal}
         setIsSearchModal={setIsSearchModal}/>
        <div className="flex iems-center gap-5 ml-4">
            <div className='flex items-center gap-1 cursor-pointer'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild={true}>
                        <div className='flex items-center space-x-2 '>
                            <Avatar>
                                <AvatarFallback>
                                    {session?.user?.name[0]||'U'}
                                </AvatarFallback>
                                <AvatarImage src={session?.user?.image||'/placeholder-user.jpg'}/>
                            </Avatar>
                            <span className='text-sm font-medium hidden lg:block'>
                                {session?.user?.name||'User'}
                            </span>
                        </div>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className='w-56'>
                        <DropdownMenuItem className={"cursor-pointer"} onClick={handleLogout}>
                            <LogOut className='mr-2 w-4 h-4'/>
                            <span className='font-bold'>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        
    </header>
  )
}

export default Header