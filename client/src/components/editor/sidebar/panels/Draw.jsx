import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { brushSizes, drawingColorPresets } from '@/config'
import { toggleDrawingMode, toggleEraseMode, updateDrawingBrush } from '@/fabric/fabric-utils'
import { useEditorStore } from '@/store/useEditorStore'
import { Droplets, EraserIcon, Minus, Paintbrush, Palette, PencilIcon, Plus } from 'lucide-react'
import React, { useState } from 'react'

const Draw = () => {
  const [isDrawingMode,setIsDrawingMode] = useState(false)
  const [isErasing,setIsErasing] = useState(false)
  const [drawing,setDrawing] = useState('#000000')
  const [brushWidth,setBrushWidth] = useState(5)
  const [drawingOpacity,setDrawingOpacity] = useState(100)
  const [activeTab,setActiveTab] = useState('colors')
  const {canvas} = useEditorStore();

  const handleToggleDrawingMode = ()=>{
    if(!canvas) return ;
    const newMode = !isDrawingMode;
    setIsDrawingMode(newMode);
    if(newMode&&isErasing){
      setIsErasing(false)
    }
    toggleDrawingMode(canvas,newMode,drawing,brushWidth)
  }

  const handleDrawingColorChange = (color)=>{
    setDrawing(color)
    if(canvas&&isDrawingMode&&!isErasing){
          updateDrawingBrush(canvas,{color})

    }
  }
  const handleBrushWidthChange = (width)=>{
    setBrushWidth(width)
     if(canvas&&isDrawingMode){
          updateDrawingBrush(canvas,{width:isErasing?width*2:width})
    }
  }
  const handleDrawingOpacityChange = (value)=>{
    const opacity = Number(value[0]);
    setDrawingOpacity(opacity)
     if(canvas&&isDrawingMode){
          updateDrawingBrush(canvas,{opacity:opacity/100})
    }
  }
  const handleToggleErasing = ()=>{
     if(!canvas&&isDrawingMode) return ;
   const newErasing = !isErasing;
   setIsErasing(newErasing)
   toggleEraseMode(canvas,newErasing,drawing,brushWidth*2)
  }

  return (
    <div className='p-4'>
      <div className='space-y-5'> 
        <Button onClick={handleToggleDrawingMode} variant={isDrawingMode?'default':'outline'} className={'w-full py-6 group transition-all'} 
        size="lg">
          <span className='font-medium'>
            {
              isDrawingMode?'Exit Drawing Mode':'Enter Drawing Mode'
            }
          </span>
        </Button>
        {
          isDrawingMode &&<div>
              <Tabs defaultValue="colors" 
              className={'w-full'}
              value={activeTab}
              onValueChange={setActiveTab}
              >

                <TabsList className={'grid grid-cols-3 mb-4'}> 
                    <TabsTrigger value={'colors'}>
                      <Palette className='mr-2 h-4 w-4'/>Colors</TabsTrigger>
                    <TabsTrigger value={'brush'}><Paintbrush className='mr-2 h-4 w-4'/> Brush</TabsTrigger>
                    <TabsTrigger value={'tools'}><EraserIcon className='mr-2 h-4 w-4'/> Tools</TabsTrigger>
                </TabsList>
                <TabsContent value={'colors'}>
                    <div className='space-y-3 '>
                      <div className='space-y-3'> 
                          <div className='flex justify-between items-center'>
                            <Label>Color Palette</Label>
                            <div className='w-6 h-6 rounded-full border shadow-sm' style={{backgroundColor:drawing}}></div>
                          </div>
                      </div>
                            <div className='grid grid-cols-5 gap-2'>
                              {
                                drawingColorPresets.map(color=>(
                                  <div key={color}>
                                  <button onClick={()=>handleDrawingColorChange(color)}
                                   className={`w-10 h-10 rounded-full  border transition-transform hover:scale-110 ${color === drawing?'ring-2 ring-offset-2 ring-primary':''}`}
                                   style={{backgroundColor:color}}></button>
                                  </div>
                                ))
                              }
                            </div>
                            <div className="flex mt-5 space-x-2">
                              <div className='relative'>
                                <Input type='color' value={drawing}
                                 onChange={(e)=>handleDrawingColorChange(e.target.value)}
                                 className={'w-12 h-10 p-1 cursor-pointer'}
                                 disabled={isErasing}
                                 />
                              </div>
                              <Input type='text' 
                              value={drawing}
                              onChange={(e)=>handleDrawingColorChange(e.target.value)}
                              className='flex-1'
                              disabled={isErasing}

                              />
                            </div>
                    </div>
                </TabsContent>
                <TabsContent value={'brush'} className={'space-y-4'}>
                 <div className='space-y-3'>
                   <Label className={'block text-sm font-semibold'}> Brush Size</Label>
                   <div className="flex items-center space-x-3">
                    <Minus className='h-4 w-4 text-gray-500' />
                    <Slider value={[brushWidth]} min={1}
                     max={30} step={1} className={'flex-1'}
                     onValueChange={(value)=>setBrushWidth(value)} />
                    <Plus className='h-4 w-4 text-gray-500' />
                   </div>
                    <div className='grid grid-cols-3 gap-2'>
                            {
                              brushSizes.map((brush)=>(
                                <Button key={brush.value}
                                className={'px-2 py-1 h-auto'}
                                onClick={()=>handleBrushWidthChange(brush.value)}
                                variant={brush.value === brushWidth?'default':'outline'}> 
                                    {brush.label}
                                </Button>
                              ))
                            }
                    </div>
                    <div className='space-y-2 mt-4 '>
                      <div className='flex justify-between'>
                        <Label className={'font-medium '}>
                          <Droplets className='mr-2 h-4 w-4'/> Opacity
                        </Label>
                            <span className='text-sm font-medium'>{drawingOpacity}%</span>
                      </div>
                            <Slider value={[drawingOpacity]} min={1}
                                max={100} step={1} className={'flex-1'}
                                onValueChange={(value)=>handleDrawingOpacityChange(value)} />

                    </div>
                 </div>
                    {/* <PencilIcon className={`${isDrawingMode ? 'animate-bounce':'hover:animate-bounce'}`} /> */}
                </TabsContent>
                <TabsContent value={'tools'}>
                    <Button onClick={handleToggleErasing} variant={isErasing?'destructive':'outline'} 
                    size={'large'}
                    className={'w-full py-6 '}>
                      <EraserIcon className='w-5 h-5 mr-2'/>
                      {
                        isErasing ? 'Stop Erasing':'Eraser mode'
                      }
                    </Button>
                </TabsContent>

              </Tabs>
          </div>
        }

      </div>
    </div>
  )
}

export default Draw