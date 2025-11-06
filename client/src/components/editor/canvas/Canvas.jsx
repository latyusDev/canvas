import { customizeBoundingBox, initializeFabric } from '@/fabric/fabric-utils'
import { useEditorStore } from '@/store/useEditorStore'
import React, { useEffect, useRef } from 'react'

const Canvas = () => {
  
  const canvasRef = useRef(null)
  const canvasContainerRef = useRef(null)
  const fabricCanvasRef = useRef(null)
  const initAttemptedRef = useRef(false)
  const {setCanvas,canvas,markAsModified} = useEditorStore();


  useEffect(()=>{
    const cleanUpCanvas = ()=>{
      if(fabricCanvasRef.current){
        try{
          fabricCanvasRef.current.dispose()
        }catch(e){
          console.error('error disposing the canvas: '+e)
        }
        fabricCanvasRef.current = null
        setCanvas(null)
        try{
              fabricCanvasRef.current.off('object:added')
              fabricCanvasRef.current.off('object:modified')
              fabricCanvasRef.current.off('object:removed')
              fabricCanvasRef.current.off('path:created')
        }catch(e){
              console.log(e)
        }
      }
    }
    cleanUpCanvas()

    // reset init flag
    initAttemptedRef.current = false;

    // init  canvas

    const initCanvas = async()=>{
      
      if(typeof window === undefined || !canvasRef.current || initAttemptedRef.current){
        return 
      }

      initAttemptedRef.current = true;

      try{
        const fabricCanvas = await initializeFabric(canvasRef.current,canvasContainerRef.current)//first current

        if(!fabricCanvas){
          console.error('Failed to initialize Fabric.js canvas')
          return
        }
        fabricCanvasRef.current = fabricCanvas
        // set canvas in store
        setCanvas(fabricCanvas)

        console.log('Canvas init is done and set in store');
        // apply custom style for the controls
        customizeBoundingBox(fabricCanvas);

        // set up event listeners
        const handleCanvasChange = ()=>{
          //implement auto save and update canvas data
          markAsModified()
          console.log('canvas change');
          
        }

        fabricCanvas.on('object:added',handleCanvasChange)
        fabricCanvas.on('object:modified',handleCanvasChange)
        fabricCanvas.on('object:removed',handleCanvasChange)
        fabricCanvas.on('path:created',handleCanvasChange)

      } catch(e){
          console.error('Failed to init canvas: '+e)
      }

    }

    const timer = setTimeout(()=>{
      initCanvas()
      console.log('work')
    },50)


    return ()=>{
       clearInterval(timer)
      initCanvas()//second
    }

  },[])


  return (
    <div className='relative w-full h-[600px] overflow-auto' ref={canvasContainerRef}>
      <canvas ref={canvasRef}/>
    </div>
  )
}

export default Canvas