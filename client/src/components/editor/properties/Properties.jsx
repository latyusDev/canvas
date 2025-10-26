import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { cloneSelectedObject, deleteSelectedObject } from '@/fabric/fabric-utils';
import { fontFamilies, _imageProperties, _textProperties, borderStyles } from '@/static/data';
import { useEditorStore } from '@/store/useEditorStore'
import { Bold, Copy, FlipHorizontal, Italic, MoveDown, MoveUp, Trash, Underline, X } from 'lucide-react';
import React, {useEffect, useState } from 'react'
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
                                      


const Properties = () => {
    const [selectedObject,setSelectedObject] = useState(null)
    const [objectType,setObjectType] = useState('')
    const [opacity,setOpacity] = useState(100);
    const [width,setWidth] = useState(0);
    const [height,setHeight] = useState(0);
    const [borderColor,setBorderColor] = useState('#000000')
    const [borderWidth,setBorderWidth] = useState(0)
    const {canvas,setShowProperties,markAsModified} = useEditorStore()

    // text properties
    const [textProperties,setTextProperties] = useState(_textProperties)
    const [imageProperties,setImageProperties] = useState(_imageProperties)
    //active object
    //object added
    //object removed
    //object modified

    // there are properties for :

    // text
    

    // image


    // shapes


    // additinal

    useEffect(()=>{
        if(!canvas) return;
        const handleSelectionCreated = ()=>{

        const activeObject = canvas.getActiveObject();
        if(activeObject){
            let fillColor,borderStyle;
            setSelectedObject(activeObject)
            // update common properties
            setOpacity(Math.round(activeObject.opacity*100)||100)
            setWidth(Math.round(activeObject.width+activeObject.scaleX))
            setBorderColor(activeObject.stroke||'#000000')
            setBorderWidth(activeObject.strokeWidth||0)
            setHeight(Math.round(activeObject.height+activeObject.scaleY))
            if(activeObject.type === 'i-text'){
                setObjectType('text')
                setTextProperties({
            text: activeObject.text || '',
            fontFamily: activeObject.fontFamily || 'Arial',
            fontSize: activeObject.fontSize || 24,
            fontWeight: activeObject.fontWeight || 'normal',
            fontStyle: activeObject.fontStyle || 'normal',
            underline: activeObject.underline || false,
            textBackgroundColor: activeObject.textBackgroundColor || '',
            textColor: activeObject.fill || '#000000',
            letterSpacing: activeObject.charSpacing || 0
        });
                
            }else if(activeObject.type === 'path'){
                setObjectType('path')
                  if(activeObject.strokeDashArray){
                    if(activeObject.strokeDashArray[0] === 5 && activeObject.strokeDashArray[1] === 5){
                        borderStyle = 'dashed'
                    }else if(activeObject.strokeDashArray[0] === 2 && activeObject.strokeDashArray[1] === 2){
                        borderStyle = 'dotted'

                }else{
                        borderStyle = 'solid'
                }
                }
            }else if(activeObject.type === 'image'){
                let filter = 'none';
                let blur = 0
                let filterObj = null;
                setObjectType('image')
                if(activeObject.filters&&activeObject.filters.length > 0){
                     filterObj = activeObject.filters[0]
                    if(filterObj.type === 'Grayscale'){
                        filter = 'grayscale'
                    } else if(filterObj.type === 'Sepia'){
                        filter = 'sepia'
                    } else if(filterObj.type === 'Invert'){
                        filter = 'invert'
                    } else if(filterObj.type === 'Blur'){
                        filter = 'blur'
                        console.log(filter,'middle')
                        blur = blur === 0?0 : filterObj.blur*100||0
                    }else{
                        filter = 'none'
                    }
                }
                setImageProperties({...imageProperties,filter,blur})
            }else{
                setObjectType('shape')

                if(activeObject.fill &&typeof activeObject.fill === 'string'){
                    fillColor = activeObject.fill||'#000000';
                }
                console.log(fillColor)
                if(activeObject.strokeDashArray){
                    if(activeObject.strokeDashArray[0] === 5 && activeObject.strokeDashArray[1] === 5){
                        borderStyle = 'dashed'
                        console.log('1',borderStyle)
                    }else if(activeObject.strokeDashArray[0] === 2 && activeObject.strokeDashArray[1] === 2){
                        borderStyle = 'dotted'
                        console.log('2',borderStyle)

                }else{
                        borderStyle = 'solid'
                }
                }

                setImageProperties({
                    fillColor,
                    borderStyle,

                })
            }
        }
        }
        const handleSelectionCleared = ()=>{

        }

        const getActiveObject = canvas.getActiveObject();
        if(getActiveObject){
            handleSelectionCreated()
        }

        canvas.on('selection:created',handleSelectionCreated)
        canvas.on('selection:updated',handleSelectionCreated)
        canvas.on('selection:cleared',handleSelectionCleared)
        canvas.on('object:modified',handleSelectionCreated)


         return ()=>{
          canvas.off('selection:created',handleSelectionCreated)
          canvas.off('selection:updated',handleSelectionCreated)
          canvas.off('selection:cleared',handleSelectionCleared)
          canvas.off('object:modified',handleSelectionCreated)

      }
    },[canvas])
    

    const updateObjectProperty = (property,value)=>{
        if(!canvas) return;
        selectedObject.set(property,value)
        canvas.renderAll()
        markAsModified();
    }

    // opacity
    const handleOpacityChange = (value)=>{
        console.log(value)
        const newValue= Number(value[0])
        setOpacity(value)
        updateObjectProperty('opacity',newValue/100)
    }

    // duplicate
    const handleDuplicate = async()=>{
        if(!canvas || !selectedObject) return;
        await cloneSelectedObject(canvas);
    }

    
    const handleDelete = ()=>{
        if(!canvas || !selectedObject) return;
         deleteSelectedObject(canvas);
         markAsModified();

    }
    // arrangement
    const handleBringToFront = ()=>{
        if(!canvas || !selectedObject) return;
        canvas.bringObjectToFront(selectedObject);
        canvas.renderAll()
        markAsModified();

    }

    const handleSendToBack = ()=>{
        if(!canvas || !selectedObject) return;
            canvas.sendObjectToBack(selectedObject);
            canvas.renderAll()
            markAsModified();

    }

    // flip H and flip V
    const handleFlipHorizonal = ()=>{
        if(!canvas || !selectedObject) return;
        const flipX = !selectedObject.flipX
        updateObjectProperty('flipX',flipX)
        canvas.renderAll()
    }
    const handleFlipVertical = ()=>{
        if(!canvas || !selectedObject) return;
        const flipY = !selectedObject.flipY
        updateObjectProperty('flipY',flipY)
        canvas.renderAll()
    }



    const handleTextChange = (e)=>{
        const text = e.target.value;
        setTextProperties({...textProperties,text})
        updateObjectProperty('text',text)
    }

    const handleFontSizeChange = (e)=>{
        const fontSize = Number(e.target.value);
        setTextProperties({...textProperties,fontSize})
        updateObjectProperty('fontSize',fontSize)

    }
   
    const handleFontFamilyChange = (fontFamily)=>{
        setTextProperties({...textProperties,fontFamily})
        updateObjectProperty('fontFamily',fontFamily)

    }

    const handleToggleBold = ()=>{
        const fontWeight = textProperties.fontWeight === 'bold' ?'normal':'bold'
         setTextProperties({...textProperties,fontWeight})
        updateObjectProperty('fontWeight',fontWeight)

    }

    const handleToggleItalic = ()=>{
         const fontStyle = textProperties.fontStyle === 'italic' ?'normal':'italic'
         setTextProperties({...textProperties,fontStyle})
        updateObjectProperty('fontStyle',fontStyle)

    }

    const handleToggleUnderline = (e)=>{
           const underline = !textProperties.underline
         setTextProperties({...textProperties,underline})
        updateObjectProperty('underline',underline)

    }
    const handleToggleTextColorChange = (e)=>{
        const textColor = e.target.value;
        console.log(textColor)
        setTextProperties({...textProperties,textColor})
        updateObjectProperty('fill',textColor)
    }

    const handleToggleTextBackgroundColorChange = (e)=>{
        const textBackgroundColor = e.target.value;
        console.log(textBackgroundColor)

        setTextProperties({...textProperties,textBackgroundColor})
        updateObjectProperty('backgroundColor',textBackgroundColor)
    }
    const handleLetterSpacingChange = (value)=>{
        const letterSpacing = value[0];
        setTextProperties({...textProperties,letterSpacing})
        updateObjectProperty('charSpacing',letterSpacing)
    }
   
    const handleFillColorChange = (e)=>{
        const fillColor = e.target.value;
        setImageProperties({...imageProperties,fillColor})
        updateObjectProperty('fill',fillColor)
       
    }
    const handleBorderColorChange = (e)=>{
          const borderColor = e.target.value;
        setBorderColor(borderColor)
        updateObjectProperty('stroke',borderColor)
    }
    
    const handleBorderWidthChange = (value)=>{
        const borderWidth = value[0];
        setBorderWidth(borderWidth)
        updateObjectProperty('strokeWidth',borderWidth)
    }
   
    const handleBorderStyleChange = (value)=>{
            const borderStyle = value;
            console.log(borderStyle,'style')
        setImageProperties({...imageProperties,borderStyle})
        let strokeDashArray = null;
        if(value === 'dashed'){
            strokeDashArray=[5,5]
        }else if(value === 'dotted'){
            strokeDashArray=[2,2]
        }
        updateObjectProperty('strokeDashArray',strokeDashArray)
       
    }

    
    const handleImageFilterChange = async(filter)=>{
        setImageProperties({...imageProperties,filter})
        if(!canvas || !selectedObject ||selectedObject.type !== 'image') return;

        try{

            canvas.discardActiveObject()
            const {filters} = await import('fabric');
            selectedObject.filters = [];
            switch(filter){
                case 'grayscale':
                    selectedObject.filters.push(new filters.Grayscale())
                break;
                case 'sepia':
                    selectedObject.filters.push(new filters.Sepia())
                break;
                case 'invert':
                    selectedObject.filters.push(new filters.Invert())
                break;
                case 'blur':
                    selectedObject.filters.push(new filters.Blur({blur:imageProperties.blur/100}))
                break;
                case 'none':
                    default:
            }
            selectedObject.applyFilters()
            canvas.setActiveObject(selectedObject)
            canvas.renderAll()
            markAsModified();


        }catch(e){
            console.error('failed to apply filter '+ e)
        }
       
    }

     const handleBlurChange = async(value)=>{
        const blur = value[0];
        // console.log(blur)
        setImageProperties({...imageProperties,blur})
        if(!canvas||!selectedObject|selectedObject.type !== 'image' || imageProperties.filter !=='blur') return;
        try{
            const {filters} = await import('fabric')
            selectedObject.filters = []
            selectedObject.filters.push(new filters.Blur({blur:imageProperties.blur/100}))
            selectedObject.applyFilters();
            canvas.renderAll();
            markAsModified();

        }catch(e){
            console.error('Error while applying blur '+e)
        }
    }

   

  return (
    <div className='fixed right-0 top-[56px] bottom-0 w-[280px] overflow-y-auto bg-white border-1 border-gray-200 z-10 '>
            <div className='flex items-center justify-between p-3'>
                <span className='font-medium '>Properties</span> 
                <X className='h-6 w-6' onClick={()=>{
                    setShowProperties(false)
                    canvas.discardActiveObject();
                    canvas.renderAll();
                }
                }/>

            </div>

        {/* </div> */}
        <div className='h-[cal(100%-96px)] overflow-auto p-4 space-y-6'>
            <h3 className='text-sm font-medium'>Size & Position</h3>
            {/* width and height */}
            <div className="grid grid-cols-2 gap-3">
                <div className='space-y-1'>
                    <Label className='text-xs'>width</Label>
                    <div className="h-9 px-3 border rounded-md flex items-center" >
                        {width}
                    </div>

                </div>

                <div className='space-y-1'>
                    <Label className='text-xs'>height</Label>
                     <div className="h-9 px-3 border rounded-md flex items-center" >
                        {height}
                    </div>

                </div>
            </div>
            {/* opacity */}
           <div className="space-y-2">
                <div className="flex justify-between">
                    <Label htmlFor='opacity' className={'text-xs'}>Opacity</Label>
                    <span>{opacity}</span>
                </div>
                <Slider id='opacity'
                max={100}
                step={1}
                value={[opacity]}
                onValueChange={(value)=>handleOpacityChange(value)}
                min={0}/>
           </div>
           {/* flip H, flip V */}

           <div className='flex flex-wrap gap-2'>
                <Button onClick={handleFlipHorizonal} variant={'outline'} size="sm" className='h-8   text-xs'>
                    <FlipHorizontal className='h-4 w-4 mr-1 '/> 
                    Flip H
                </Button>
                <Button onClick={handleFlipVertical}  variant={'outline'} size="sm" className='h-8   text-xs'>
                    <FlipHorizontal className='h-4 w-4 mr-1 '/> 
                    Flip V
                </Button>
           </div>
           {/* arrangement */}

           <div className='space-y-4 pt-4 border-t'>
            <h3 className='text-sm font-medium '>Layer Position</h3>
            <div className='grid grid-cols-2 gap-2'>
                <Button onClick={handleBringToFront} variant={'outline'} size="sm" className='h-8 text-black bg-white text-xs hover:bg-gray-200'>
                    <MoveUp className='h-4 w-4'/>
                    <span>Bring to front</span>
                </Button>
                <Button  onClick={handleSendToBack}  variant={'outline'} size="sm" className='h-8 text-black bg-white text-xs hover:bg-gray-200'>
                    <MoveDown className='h-4 w-4'/>
                    <span>send to back</span>
                </Button>

            </div>
           </div>
           {/* duplicate and delete */}
           <div className='space-y-4 pt-4 border-t'>
            <h3 className='text-sm font-medium '>Duplicate and Delete</h3>
            <div className='grid grid-cols-2 gap-2'>
                <Button onClick={handleDuplicate} variant={'default'} size="sm" className='h-8 text-xs '>
                    <Copy className='h-4 w-4'/>
                    <span>Duplicate</span>
                </Button>
                <Button onClick={handleDelete} variant={'destructive'} size="sm" className='h-8  '>
                    <Trash className='h-4 w-4'/>
                    <span>Delete</span>
                </Button>

            </div>
           </div>
           {
            objectType === 'text'&& <div>
                <div className="space-y-4 border-t">
                    <h3 className="text-sm font-medium"> Text Properties</h3>
                    <div className="space-y-2">
                        <Label className={'text-xs'} htmlFor='text-content'>Text Content</Label>
                        <Textarea
                        id='text-content'
                        value={textProperties.text}
                        onChange={handleTextChange}
                        className={'h-20 resize-none'}
                        />

                    </div>
                    {/* font size */}
                   
                    <div className="space-y-2">
                        <Label className={'text-xs'} htmlFor='text-content'>Font Size</Label>
                        <Input
                        id='font-size'
                        value={textProperties.fontSize}
                        onChange={(e)=>handleFontSizeChange(e)}
                        className={'w-16 h-7 text-xs'}
                        type={'number'}
                        />
                    </div>
                    {/* font family */}
                    <div className='space-y-2'>
                        <Label htmlFor='font-family' className={'text-sm'}>Font Family</Label>
                        <Select value={textProperties.fontFamily} onValueChange={(e)=>handleFontFamilyChange(e)}>
                            <SelectTrigger id='font-family' className={'h-10'}>
                                <SelectValue placeholder='Select Font'>{textProperties.fontFamily}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    fontFamilies.map(family=>(
                                        <SelectItem key={family} value={family} style={{fontFamily:family}}>{family}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>

                    </div>
                    {/* font style */}
                    <div className='space-y-2'>
                        <Label htmlFor='font-style' className={'text-sm'}>Style</Label>
                        <div className='flex gap-4'>
                            <Button
                            variant={textProperties.fontWeight === 'bold'?'default':'outline'}
                            onClick={handleToggleBold}
                            size={'icon'}
                            className={'w-8 h-8'}><Bold className='w-4 h-4'/></Button>
                            <Button
                            variant={textProperties.fontStyle === 'italic'?'default':'outline'}
                            onClick={handleToggleItalic}
                            size={'icon'}
                            className={'w-8 h-8'}><Italic className='w-4 h-4'/></Button>
                            <Button
                            variant={textProperties.underline ?'default':'outline'}
                            onClick={handleToggleUnderline}
                            size={'icon'}
                            className={'w-8 h-8'}><Underline className='w-4 h-4'/></Button>
                        </div>
                        

                    </div>
                                <div className="flex justify-between">
                                      {/* text color */}
                                    
                    <div className='space-y-2'>
                        <Label htmlFor='text-color' className={'text-sm'}>Text Color</Label>
                      <div className="relative w-8 h-8 overflow-hidden rounded-md border">
                            <div className='absolute inset-0' style={{backgroundColor:textProperties.textColor}}>
                                    <Input 
                                        id='text-color' 
                                        type='color'
                                        value={textProperties.textColor}
                                        onChange={handleToggleTextColorChange}
                                        className={'absolute inset-0 opacity-0 cursor-pointer'}
                                    />
                            </div>
                      </div>
                    </div>
                    {/* text background color */}
                    <div className='space-y-2'>
                        <Label htmlFor='text-bg-color' className={'text-sm'}>Text BG Color</Label>
                      <div className="relative w-8 h-8 overflow-hidden rounded-md border">
                            <div className='absolute inset-0' style={{backgroundColor:textProperties.textBackgroundColor}}>
                                    <Input 
                                        id='text-bg-color'
                                        type={'color'}
                                        value={textProperties.textBackgroundColor}
                                        onChange={handleToggleTextBackgroundColorChange}
                                        className={'absolute inset-0 opacity-0 cursor-pointer'}
                                    />
                            </div>
                      </div>
                    </div>
                                </div>
                                  <div className="space-y-2">

                        <div className='flex justify-between'>
                            <Label className={'text-xs'} htmlFor='letter-spacing'>Letter Spacing</Label>
                            <span className='text-xs'>{textProperties.letterSpacing}</span>
                        </div>
                        <Slider
                        id='letter-spacing'
                        value={[textProperties.letterSpacing]}
                        min={-200}
                        max={800}
                        step={10}
                        onValueChange={(value)=>handleLetterSpacingChange(value)}
                        type={'number'}
                        />
                    </div>
                </div>
            </div>
           }

           {
            objectType === 'shape'&&<div>
                <h3 className='text-sm font-medium mb-4'>Shape Properties</h3>
                <div className='space-y-2'>
                    <div className="flex justify-between">
                         <div>
                        <Label htmlFor='fill-color' className={'text-sm'}>Fill Color</Label>
                             <div className="relative w-8 h-8 overflow-hidden rounded-md border">
                            <div className='absolute inset-0' style={{backgroundColor:imageProperties.fillColor}}>
                                    <Input 
                                        id='fill-color' 
                                        type='color'
                                        value={textProperties.fillColor}
                                        onChange={handleFillColorChange}
                                        className={'absolute inset-0 opacity-0 cursor-pointer'}
                                    />
                            </div>
                      </div>
                         </div>
                    <div>
                            <Label htmlFor='border-color' className={'text-sm'}>Border Color</Label>
                            <div className="relative w-8 h-8 overflow-hidden rounded-md border">

                            <div className='absolute inset-0' style={{backgroundColor:borderColor}}>
                                    <Input 
                                        id='border-color' 
                                        type='color'
                                        value={borderColor}
                                        onChange={handleBorderColorChange}
                                        className={'absolute inset-0 opacity-0 cursor-pointer'}
                                    />
                            </div>
                      </div>
                    </div>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='border-width' className={'text-xs'}>Border Width</Label>
                        <span className='text-xs'>{borderWidth}</span>
                        <Slider 
                        id='border-width'
                        min={0}
                        max={20}
                        step={1}
                        value={[borderWidth]}
                        onValueChange={(value)=>handleBorderWidthChange(value)}
                        
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='border-style' className={'text-xs'}>Border Style</Label>
                         <Select value={imageProperties.borderStyle||'solid'} onValueChange={(value)=>handleBorderStyleChange(value)}>
                            <SelectTrigger id='border-style' className={'h-10'}>
                                <SelectValue placeholder='Select border style'>{imageProperties.borderStyle}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value='solid' className={'capitalize'}>Solid</SelectItem>
                            <SelectItem value='dashed' className={'capitalize'}>Dashed</SelectItem>
                            <SelectItem value='dotted' className={'capitalize'}>Dotted</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                </div>
            </div>
           }

           {
                objectType === 'image'&& <div className='space-y-4 border-t'>
                    <h3 className='text-sm font-medium'>Image Properties</h3>
                        
                    <div>
                            <Label htmlFor='border-color' className={'text-sm'}>Border Color</Label>
                            <div className="relative w-8 h-8 overflow-hidden rounded-md border">

                            <div className='absolute inset-0' style={{backgroundColor:borderColor}}>
                                    <Input 
                                        id='border-color' 
                                        type='color'
                                        value={borderColor}
                                        onChange={handleBorderColorChange}
                                        className={'absolute inset-0 opacity-0 cursor-pointer'}
                                    />
                      </div>
                    </div>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='border-width' className={'text-xs'}>Border Width</Label>
                        <span className='text-xs'>{borderWidth}</span>
                        <Slider 
                        id='border-width'
                        min={0}
                        max={20}
                        step={1}
                        value={[borderWidth]}
                        onValueChange={(value)=>handleBorderWidthChange(value)}
                        
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='border-style' className={'text-xs'}>Border Style</Label>
                         <Select value={imageProperties.borderStyle||'solid'} onValueChange={handleBorderStyleChange}>
                            <SelectTrigger id='border-style' className={'h-10'}>
                                <SelectValue placeholder='Select border style'>{imageProperties.borderStyle}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value='solid' className={'capitalize'}>Solid</SelectItem>
                            <SelectItem value='dashed' className={'capitalize'}>Dashed</SelectItem>
                            <SelectItem value='dotted' className={'capitalize'}>Dotted</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                    <div className='space-y-2 '>
                        <Label htmlFor='filter' className={'text-xs'}>Filter</Label>
                            <Select value={imageProperties.filter||'solid'} onValueChange={handleImageFilterChange}>
                            <SelectTrigger id='filter' className={'h-10'}>
                                <SelectValue placeholder='Select image filter'>{imageProperties.filter}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value='none' className={'capitalize'}>none</SelectItem>
                            <SelectItem value='grayscale' className={'capitalize'}>Grayscale</SelectItem>
                            <SelectItem value='invert' className={'capitalize'}>Invert</SelectItem>
                            <SelectItem value='blur' className={'capitalize'}>Blur</SelectItem>
                            <SelectItem value='sepia' className={'capitalize'}>Sepia</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {
                        imageProperties.filter === 'blur'
                        &&<div className='space-y-2 '>
                                <div className='flex justify-between mb-4'>
                                    <Label htmlFor="blur" className={'text-xs'}>Blur Amount</Label>
                                    <span className='font-medium text-xs'>{imageProperties.blur}%</span>
                                </div>
                                <Slider 
                                id='blur'
                                min={0}
                                max={100}
                                step={1}
                                value={[imageProperties.blur]} 
                                onValueChange={(value)=>handleBlurChange(value)}
                                />
                        </div>
                    }
                </div>
           }

           {
                objectType === 'path'&& <div className='space-y-4 border-t'>
                    <h3 className='text-sm font-medium'>Path Properties</h3>
                        
                    <div>
                            <Label htmlFor='border-color' className={'text-sm'}>Border Color</Label>
                            <div className="relative w-8 h-8 overflow-hidden rounded-md border">

                            <div className='absolute inset-0' style={{backgroundColor:borderColor}}>
                                    <Input 
                                        id='border-color' 
                                        type='color'
                                        value={borderColor}
                                        onChange={handleBorderColorChange}
                                        className={'absolute inset-0 opacity-0 cursor-pointer'}
                                    />
                      </div>
                    </div>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='border-width' className={'text-xs'}>Border Width</Label>
                        <span className='text-xs'>{borderWidth}</span>
                        <Slider 
                        id='border-width'
                        min={0}
                        max={20}
                        step={1}
                        value={[borderWidth]}
                        onValueChange={(value)=>handleBorderWidthChange(value)}
                        
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='border-style' className={'text-xs'}>Border Style</Label>
                         <Select value={imageProperties.borderStyle||'solid'} onValueChange={handleBorderStyleChange}>
                            <SelectTrigger id='border-style' className={'h-10'}>
                                <SelectValue placeholder='Select border style'>{imageProperties.borderStyle}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value='solid' className={'capitalize'}>Solid</SelectItem>
                            <SelectItem value='dashed' className={'capitalize'}>Dashed</SelectItem>
                            <SelectItem value='dotted' className={'capitalize'}>Dotted</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                    
                </div>
           }
        </div>
    </div>
  )
}

export default Properties