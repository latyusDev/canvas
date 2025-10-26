import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useEditorStore } from '@/store/useEditorStore'
import { ChevronDown, Download, Eye, Loader2, LogOut, Pencil, Save, Star } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import ExportModal from '../export/ExportModal'
import { toast } from 'sonner'
import { getUserSubscription } from '@/services/subscription-service'
import { getUserDesigns } from '@/services/design-service'

const Header = () => {

  const {isEditing,setIsEditing,name,setName,canvas,userDesigns,setUserDesigns,setShowPremiumModal,
  userSubscription,setUserSubscription,saveStatus,markAsModified,designId} = useEditorStore();
  const [showExportModal,setShowExportModal] = useState(false);
  const {data:session} = useSession();

  const handleLogout = ()=>{
    signOut();
  }
  
  useEffect(()=>{
    if(!canvas) return;
    canvas.selection = isEditing
    canvas.getObjects().forEach((obj)=>{
      obj.selectable = isEditing;
      obj.evented = isEditing
    })
  },[isEditing])

  useEffect(()=>{
    if(!canvas || !designId) return;
      markAsModified()
  },[name,canvas,designId])


  
    const fetchUserSubscription = async()=>{
      const response = await getUserSubscription();
      if(response.success){
        setUserSubscription(response?.data)
      }
    }
  
    const fetchUserDesigns = async()=>{
        const results = await getUserDesigns();
        setUserDesigns(results?.data)
        console.log(results,'result')
    }
    useEffect(()=>{
      fetchUserSubscription()
      fetchUserDesigns()
    },[])
  
  const handleExport = ()=>{
    if(userDesigns.length>=5&&!userSubscription.isPremium){
        toast.error("Please upgrade to premium", {
          description: "You need to upgrade to premium to create more designs",
        })
        return 
      }
    setShowExportModal(true)
  }


  const handlePremium = ()=>{
    if(userSubscription?.userSubscription){
      setShowPremiumModal(true)

    }
  }

  
  return (
    <header className='flex bg-blue-600 items-center justify-between px-4 h-14'>
        <div className='flex items-center space-x-2  justify-between'>
          <div className="ml-6">
             <DropdownMenu >
              <DropdownMenuTrigger asChild="true">
                 <div className='flex space-x-2 items-center text-white'>
                       <span>{isEditing?'Editing':'Viewing'}</span>
                  <ChevronDown className='mt-1.5 w-4 h-4'/>
                 </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
               <DropdownMenuItem onClick={()=>setIsEditing(true)}>
                  <div className='flex items-center gap-2'>
                       <Pencil  className='ml-3 w-4 h-4'/>
                      <span>editing</span>
                 </div>
               </DropdownMenuItem>
               <DropdownMenuItem onClick={()=>setIsEditing(false)}>
                    <div className='flex items-center gap-2'>
                       <Eye  className='ml-3 w-4 h-4'/>
                      <span>viewing</span>
                 </div>
               </DropdownMenuItem>
              </DropdownMenuContent>
             
        </DropdownMenu>
          </div>
         
         <button className=' relaitive ml-3 ' title='save'>
                  {
                    saveStatus === 'Saving...'?<Loader2 className='w-5 h-5 text-white animate-spin'/>:<Save className='w-5 h-5 text-white'/>
                  }
          </button>
         <button onClick={handleExport} className=' relaitive ml-3 ' title='Export'>
                  <Download className='w-5 h-5 text-white'/>
          </button>
        </div>
          
            <div className='flex flex-1 justify-center max-w-md'>
               <input className='w-full border-1 p-2 rounded-sm text-white border-white outline-none' 
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
               />
            </div>
            <div className='flex items-center space-x-3'>
                  <button onClick={handlePremium} className='flex items-center bg-white/10 hover:bg-gray-500- 
                  text-white rounded-md h-9 px-3 transition-colors'>
                      <Star className='mr-1 w-4 h-4 text-yellow-400'/>
                      <span>{!userSubscription.isPremium?'Upgrade to premium':'Premium Member '}</span>
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild={true}>
                        <div className='flex items-center space-x-2 '>
                            <Avatar>
                                <AvatarFallback>
                                    {session?.user?.name[0]||'U'}
                                </AvatarFallback>
                                <AvatarImage src={session?.user?.image||'/placeholder-user.jpg'}/>
                            </Avatar>
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
            <ExportModal isOpened={showExportModal} onClose={setShowExportModal} />
    </header>
  )
}

export default Header