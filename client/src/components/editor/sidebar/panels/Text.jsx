import { textPresets } from '@/config';
import { addTextToCanvas } from '@/fabric/fabric-utils';
import { useEditorStore } from '@/store/useEditorStore'
import { Type } from 'lucide-react';
import React from 'react'

const Text = () => {

  const {canvas} = useEditorStore();

  const handleAddCustomText = ()=>{
    if(!canvas) return ;
    addTextToCanvas(canvas,'Enter text',{fontSize:24})
  }

  const handleAddText = (text)=>{
    if(!canvas) return ;
    addTextToCanvas(canvas,text.text,text)
  }

  return (
    <div className='p-4 space-y-4'>
      <button onClick={handleAddCustomText} className='w-full py-3 px-4 bg-purple-600 hover:bg-purple-700
       text-white rounded-md flex space-x-2 items-center justify-center transition-colors'>
        <Type className=' h-5 w-5'/>
        <span className='font-medium'>add a text box</span>
      </button>
      <div className='pt-2'>
        <h4 className='text-sm capitalize font-medium text-gray-800 mb-4'>default text styles</h4>
      </div>
      <div className="space-y-2">
          {
            textPresets.map(text=>(
              <button key={text.text} onClick={()=>handleAddText(text)} style={{fontSize:`${Math.min(text.fontSize/1.8, 24)}px`,
            fontWeight:`${text.fontWeight}`,fontStyle:`${text.fontStyle||'normal'}`,
            fontFamily:`${text.fontFamily}`}} className='w-full text-left p-3 bg-white border
               border-gray-200 hover:bg-gray-50 transition-colors'>{text.text}</button>
            ))
          }
      </div>
    </div>
  )
}

export default Text