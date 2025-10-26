// import { addShapeToCanvas } from '@/fabric/fabric-utils';
// import { shapesDefinitions, shapeTypes } from '@/fabric/shapes/shape-definitions';
// import { useEditorStore } from '@/store/useEditorStore'
// import React, { useEffect, useRef, useState } from 'react'

// const Elements = () => {
//   const {canvas} = useEditorStore();
//   const miniCanvasRef = useRef({});
//   const canvasElementRef = useRef({});
//   const [isInitialized,setIsInitialized] = useState(false);

//   useEffect(()=>{
//     if(isInitialized) return;

//     console.log('element')

//     // const timer = setTimeout(async()=>{
//     const callInit = async()=>{
//     console.log('element run')

//       try{
//         const fabric = await import('fabric');

//         for(const shapeType of shapeTypes){
//             const canvasElement =  canvasElementRef.current[shapeType]
//             console.log(canvasElement);
//             if(!canvasElement) continue;
//             // if(canvasElement === undefined) continue;
//             const canvasId = `mini-canvas-${shapeType}-${Date.now()}`
//             canvasElement.id = canvasId;
//             try{
//               const definition = shapesDefinitions[shapeType]

//               const miniCanvas  = new fabric.StaticCanvas(canvasId,{
//                 width:100,
//                 height:100,
//                 backgroundColor:'transparent',
//                 // backgroundColor:'#000000',
//                 renderOnAddRemove:true
//               })
//               miniCanvasRef.current[shapeType] = miniCanvas
//               definition.thumbnail(fabric,miniCanvas)
//               miniCanvas.renderAll();

//             }catch(definitionError){
//               console.error('Error while creating definition '+ definitionError);
//             }
//         }
//         setIsInitialized(true)
//       }catch(e){
//         console.log('failed to init '+ e)
//       }
//     // },100)
//     }
//     callInit()

//     // return clearInterval(timer)
//   },[isInitialized])


//     useEffect(()=>{
//       return ()=>{
//         Object.values(miniCanvasRef.current).forEach(miniCanvas=>{
//           if(miniCanvas && typeof miniCanvas.dispose === 'function'){
//             try{
//               miniCanvas.dispose();
//             }catch(e){
//               console.error('Error disposing canvas '+e)
//             }
//           }
//         })
//         miniCanvasRef.current = {};
//         setIsInitialized(false)
//       }
//     },[])

//     const setCanvasRef = (el,shapeType)=>{
//       if(el){
//         canvasElementRef.current[shapeType] = el
//       }
//     }

//     const handleShapeClick = (type)=>{
//       console.log(type)
//           addShapeToCanvas(canvas,type)
//     }

//   return (
    // <div className='h-full overscroll-y-auto'>
    //   <div className="p-4">
    //     <div className="grid grid-cols-3 gap-1">
    //       {
    //         shapeTypes.map(shapeType=>(
    //           <div onClick={()=>handleShapeClick(shapeType)} style={{height:'90px'}} className='cursor-pointer flex flex-col items-center justify-center' key={shapeType}>
    //             <canvas
    //               width={100} 
    //               height={100}
    //               ref={(el)=>setCanvasRef(el,shapeType)}
    //             />
    //           </div>
    //         ))
    //       }
    //     </div>
    //   </div>
    // </div>
//   )
// }

// export default Elements


import { addShapeToCanvas } from '@/fabric/fabric-utils';
import { shapesDefinitions, shapeTypes } from '@/fabric/shapes/shape-definitions';
import { useEditorStore } from '@/store/useEditorStore'
import React, { useEffect, useRef, useState } from 'react'

const Elements = () => {
  const {canvas} = useEditorStore();
  const miniCanvasRef = useRef({});
  const canvasElementRef = useRef({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized) return;

    console.log('element')

    const callInit = async () => {
      console.log('element run')

      try {
        const fabric = await import('fabric');

        // Add a small delay to ensure DOM elements are ready
        await new Promise(resolve => setTimeout(resolve, 100));

        for (const shapeType of shapeTypes) {
          const canvasElement = canvasElementRef.current[shapeType];
          console.log(canvasElement);
          
          if (!canvasElement) {
            console.warn(`Canvas element for ${shapeType} not found`);
            continue;
          }

          // Check if canvas is already initialized
          if (miniCanvasRef.current[shapeType]) {
            console.log(`Canvas for ${shapeType} already initialized`);
            continue;
          }

          try {
            const definition = shapesDefinitions[shapeType];

            // Use the canvas element directly without setting ID
            const miniCanvas = new fabric.StaticCanvas(canvasElement, {
              width: 100,
              height: 100,
              backgroundColor: 'transparent',
              renderOnAddRemove: true
            });

            miniCanvasRef.current[shapeType] = miniCanvas;
            
            // Call the thumbnail function
            if (definition && typeof definition.thumbnail === 'function') {
              definition.thumbnail(fabric, miniCanvas);
              miniCanvas.renderAll();
            } else {
              console.warn(`No thumbnail function found for ${shapeType}`);
            }

          } catch (definitionError) {
            console.error(`Error while creating definition for ${shapeType}:`, definitionError);
          }
        }
        setIsInitialized(true);
      } catch (e) {
        console.error('Failed to init:', e);
      }
    };

    callInit();
  }, [isInitialized]);

  useEffect(() => {
    return () => {
      // Cleanup function
      console.log('Cleaning up mini canvases');
      
      Object.entries(miniCanvasRef.current).forEach(([shapeType, miniCanvas]) => {
        if (miniCanvas && typeof miniCanvas.dispose === 'function') {
          try {
            miniCanvas.dispose();
            console.log(`Disposed canvas for ${shapeType}`);
          } catch (e) {
            console.error(`Error disposing canvas for ${shapeType}:`, e);
          }
        }
      });
      
      miniCanvasRef.current = {};
      canvasElementRef.current = {};
      setIsInitialized(false);
    };
  }, []);

  const setCanvasRef = (el, shapeType) => {
    if (el && !canvasElementRef.current[shapeType]) {
      canvasElementRef.current[shapeType] = el;
    }
  };

  const handleShapeClick = (type) => {
    console.log('Shape clicked:', type);
    if (canvas && typeof addShapeToCanvas === 'function') {
      addShapeToCanvas(canvas, type);
    } else {
      console.error('Canvas or addShapeToCanvas not available');
    }
  };

  return (
      <div className='h-full overscroll-y-auto'>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-1">
          {
            shapeTypes.map(shapeType=>(
              <div onClick={()=>handleShapeClick(shapeType)} style={{height:'90px'}} className='cursor-pointer flex flex-col items-center justify-center' key={shapeType}>
                <canvas
                  width={100} 
                  height={100}
                  ref={(el)=>setCanvasRef(el,shapeType)}
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Elements;