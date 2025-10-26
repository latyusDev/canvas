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

      // initCanvas()//second

    return ()=>{
       clearInterval(timer)
      initCanvas()//second

    }

  },[])

//   useEffect(() => {
//   let isMounted = true;
  
//   const initCanvas = async () => {
//     // Check if already attempted or conditions not met
//     if (typeof window === 'undefined' || !canvasRef.current || initAttemptedRef.current) {
//       return;
//     }

//     initAttemptedRef.current = true;

//     try {
//       const fabricCanvas = await initializeFabric(canvasRef.current, canvasContainerRef);
      
//       console.log(fabricCanvas, 'fabricCanvas');

//       if (!fabricCanvas) {
//         console.error('Failed to initialize Fabric.js canvas');
//         initAttemptedRef.current = false; // Reset on failure
//         return;
//       }

//       // Only set if component is still mounted
//       if (isMounted) {
//         fabricCanvasRef.current = fabricCanvas;
//         setCanvas(fabricCanvas);
//         console.log('Canvas init is done and set in store');
//       }



//     } catch (e) {
//       console.error('Failed to init canvas: ' + e);
//       initAttemptedRef.current = false; // Reset on error
//     }
//   };

//   initCanvas();

//   // Cleanup function
//   return () => {
//     isMounted = false;
//     initAttemptedRef.current = false;

//     if (fabricCanvasRef.current) {
//       try {
//         fabricCanvasRef.current.dispose();
//         console.log('Canvas disposed successfully');
//       } catch (e) {
//         console.error('Error disposing the canvas: ' + e);
//       }
//       fabricCanvasRef.current = null;
//     }
    
//     setCanvas(null);
//   };
// }, []); // Empty dependency array - runs once on mount

  return (
    <div className='relative w-full h-[600px] overflow-auto' ref={canvasContainerRef}>
      <canvas ref={canvasRef}/>
    </div>
  )
}

export default Canvas