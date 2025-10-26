import React, { useState } from 'react'
import Elements from './panels/Elements'
import Text from './panels/Text'
import Settings from './panels/Settings'
import Draw from './panels/Draw'
import { ArrowLeft, ChevronLeft, Grid, Pencil, Settings as settingIcon, Sparkle, Type, Upload as uploadIcon } from 'lucide-react'
import Ai from './panels/Ai'
import Upload from './panels/Upload'

const Sidebar = () => {
  const [isPanelCollapsed,setIsPanelCollapsed] = useState(false)
  const [activeSidebar,setActiveSidebar] = useState(null)


  const sidebarItems = [
    {
      id:'elements',
      icon:Grid,
      label:'Elements',
      panel:()=><Elements/>
    },
    {
      id:'text',
      icon:Type,
      label:'Text',
      panel:()=><Text/>
    },
    {
      id:'uploads',
      icon:uploadIcon,
      label:'Uploads',
      panel:()=><Upload/>
    },
   {
      id:'draw',
      icon:Pencil,
      label:'Draw',
      panel:()=><Draw/>
    },
    {
      id:'ai',
      icon:Sparkle,
      label:'Ai',
      panel:()=><Ai/>
    },
    {
      id:'settings',
      icon:settingIcon,
      label:'Setting',
      panel:()=><Settings/>
    }
  ]
  

  const activeItem = sidebarItems.find(item=>item.id === activeSidebar);

  const closeSecondaryPanel = ()=>{
      setActiveSidebar(null)

  }
  const togglePanelCollapse = (e)=>{
    e.stopPropagation()
    setIsPanelCollapsed(!isPanelCollapsed)
  }

    const handleItemClick = (id)=>{
        if(id == activeSidebar && !isPanelCollapsed) return;
        setActiveSidebar(id)
        setIsPanelCollapsed(false)
    }

  return (
    <div className='flex h-full relative overflow-y-auto overflow-x-hidden'>
      <aside className='bg-white w-[70px] flex flex-col gap-2 border-r-1 border-r-[#e6e6e6] '>
    {
      sidebarItems.map(item=>(
        <div onClick={()=>handleItemClick(item.id)} key={item.id} className={`py-3 hover:cursor-pointer hover:bg-gray-100 text-center ${activeSidebar === item.id?'bg-gray-100':''}`}>
            <item.icon className='mx-auto  h-5 w-5'/>
            <span className='text-sm font-[500]'>{item.label}</span>
            
        </div>
      ))
    }
      </aside>
      {
        activeSidebar && <div className={` ${isPanelCollapsed?'transition-all duration-200':'transition-all duration-200'}`} style={{
          width:isPanelCollapsed ? '0':'320px',
          opacity:isPanelCollapsed ? '0':'1',
          overflow:isPanelCollapsed ? 'hidden':'visible',
        }}>

          <div className='p-4 flex items-center gap-3 border-b-1 border-[#e6e6e6]'>
            
            <button className='' onClick={closeSecondaryPanel}><ArrowLeft className='h-5 w-5'/></button>
            <span className=''>{activeItem.label}</span>
          </div>
          <div className=''>
            {activeItem?.panel()}
          </div>
          <button className='absolute top-[50%] right-[-8px] hover:text-gray-500 z-20 bg-white rounded-full p-0.5' onClick={togglePanelCollapse}>
            <ChevronLeft className='h-5 w-5'/>
          </button>
        </div>
      }

    </div>
  )
}

export default Sidebar