import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { colorPresets } from '@/config';
import { centerCanvas } from '@/fabric/fabric-utils';
import { useEditorStore } from '@/store/useEditorStore';
import { Check, Palette } from 'lucide-react';
import React, { useState } from 'react'

const Settings = () => {
  const [backgroundColor,setBackgroundColor] = useState('#ffffff');
  const {markAsModified} = useEditorStore();

  const {canvas} = useEditorStore();

  const handleApplyChanges =()=>{
      if(canvas){
        canvas.set('backgroundColor',backgroundColor)
        canvas.renderAll();
        centerCanvas(canvas)
        markAsModified()
        
      }
  }
  const handleColorPresetApply =(color)=>{
    setBackgroundColor(color)
  }
  const handleColorChange =(e)=>{
    setBackgroundColor(e.target.value)
  }

  return (
    <div className='p-4 space-y-6 '>
      <div className="flex items-center space-x-2 mb-4">
        <Palette className='w-5 h-5 text-purple-600' />
        <h3 className='text-lg font-semibold'>Choose baccground color</h3>
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-6 gap-2 mb-3">
          {
            colorPresets.map(color=>(
              <TooltipProvider key={color}>
                <Tooltip>
                  <TooltipTrigger asChild="true">
                  <button onClick={()=>handleColorPresetApply(color)} className={`w-8 h-8 rounded-md border transition-transform hover:scale-110 ${color === backgroundColor ? 'ring-2 ring-offset-2 ring-primary':''}`} style={{backgroundColor:color}}>
                      {
                        color === backgroundColor&&<Check className='w-4 h-4 text-white mx-auto drop-shadow-md' />
                      }
                  </button>

                </TooltipTrigger>

                <TooltipContent>
                  <p>{color}</p>
                </TooltipContent>
                </Tooltip>

              </TooltipProvider>
            ))
          }
        </div>
        <div className="flex flex-col mt-3 space-x-2">
            <div className='relative'>
              <input 
              type='color'
              value={backgroundColor}
              onChange={handleColorChange}
              className='w-12 h-10 p-1 cursor-pointer'
              />
             
            </div>
            <div>
               <input 
              type='text'
              value={backgroundColor}
              onChange={handleColorChange}
              className='flex-1 border-2 p-2 rounded-sm border-gray-300'
              placeholder='#ffffff'
              />
            </div>
        </div>
        <Separator className='my-4' />
        <button className='w-full bg-black text-white rounded-md py-2 capitalize' onClick={handleApplyChanges}> apply changes</button>
      </div>
    </div>
  )
}

export default Settings