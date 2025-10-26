import React, { useCallback, useEffect, useState } from 'react'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'
import Canvas from './canvas/Canvas'
import { useParams, useRouter } from 'next/navigation'
import { useEditorStore } from '@/store/useEditorStore'
import { getUserDesignById } from '@/services/design-service'
import Properties from './properties/Properties'
import PremiumModal from '../subscription/PremiumModal'

const MainEditor = () => {

  const params = useParams();
  const designId = params?.slug
  const router = useRouter()
  const [isLoading,setIsLoading] = useState(!!designId);
  const [loadAttempted,setLoadAttempted] = useState(false);
  const [error,setError] = useState(null);
  const {canvas,setDesignId,resetStore,isEditing,setName,showPremiumModal,setShowPremiumModal,
    setShowProperties,showProperties} = useEditorStore()


  useEffect(()=>{
    
    // reset store
    resetStore()
    // set the designId

    if(designId){
      setDesignId(designId)
    }

    return ()=>resetStore();

  },[])

  useEffect(()=>{
    setLoadAttempted(false)
    setError(null)
  },[designId])

  useEffect(()=>{
    if(isLoading&&!canvas&&designId){
      const timer = setTimeout(()=>{
        if(isLoading){
          console.log('Canvas init timeout')
          setIsLoading(false)
        }
      },5000)
      return ()=>clearTimeout(timer)
    }
  
  },[isLoading,canvas,designId])

  useEffect(()=>{
    if(canvas){
      console.log('Canvas is available in editor')
    }
  },[canvas])

  // load the design

  const loadDesign = useCallback(async () => {
  // Guard clause - prevent loading if conditions aren't met
  if (!canvas || !designId || loadAttempted) {
    return;
  }

  try {
    setIsLoading(true);
    setLoadAttempted(true);
    
    console.log('Loading design:', designId);
    
    // Fetch design data
    const response = await getUserDesignById(designId);
    const design = response?.data;
    
    if (design) {
      
      console.log('Design loaded:', design);
      
      // Update name and designId
      setName(design.name);
      setDesignId(designId);
      
      try{
         if (design.canvasData) {
          // Clear canvas before loading new data
          canvas.clear();

          if(design.width&&design.height){
              canvas.setDimensions({
                width:design.width,
                height:design.height
              })
            }

    // Load canvas data if it exists
      // Parse canvas data if it's a string
      const canvasData = typeof design.canvasData === 'string' 
        ? JSON.parse(design.canvasData) 
        : design.canvasData;


      // Check if there are objects to load
      const hasObjects = canvasData.objects && canvasData.objects.length > 0;
      if(canvasData.background){
        canvas.backgroundColor = canvasData.background;
      }else{
        canvas.backgroundColor = '#ffffff';
      }

      if (!hasObjects) {
            canvas.renderAll();
        return true;
      }
      canvas.loadFromJSON(design.canvasData).then(canvas=>canvas.requestRenderAll());
    } else {
      canvas.clear();
      // Set canvas dimensions
      const width = design.width ;
      const height = design.height ;
      canvas.setWidth(width);
      canvas.setHeight(height);
      // No canvas data, set white background
      canvas.backgroundColor = '#ffffff';
      canvas.renderAll();
    }
      }catch(e){
        console.error('error loading canvas data')
      }
    }


    console.log('Design loaded successfully');
    setError(null); // Clear any previous errors

  } catch (error) {
    console.error('Failed to load design:', error);
    setError('Failed to load design. Please try again.');
    
    // Optionally reset loadAttempted to allow retry
    // setLoadAttempted(false);
  } finally {
    setIsLoading(false);
  }
}, [canvas, designId, loadAttempted, setDesignId, setName]);

// Effect to trigger load
useEffect(() => {
  if (designId && canvas && !loadAttempted) {
    console.log('Triggering loadDesign');
    loadDesign();
  } else if (!designId) {
    console.log('No designId, redirecting to home');
    router.replace('/');
  }
}, [designId, canvas, loadAttempted, loadDesign, router]);


  useEffect(()=>{
      if(!canvas) return;
      const handleSelectionCreated = ()=>{
        const activeObject = canvas.getActiveObject();
        if(activeObject){
          setShowProperties(true)
        }
      }
      if(!canvas) return;
      const handleSelectionCleared = ()=>{
          setShowProperties(false)
        }
        canvas.on('selection:created',handleSelectionCreated)
        canvas.on('selection:updated',handleSelectionCreated)
        canvas.on('selection:cleared',handleSelectionCleared)

      return ()=>{
          canvas.off('selection:created',handleSelectionCreated)
          canvas.off('selection:updated',handleSelectionCreated)
          canvas.off('selection:cleared',handleSelectionCleared)
      }
  },[canvas])
   return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <Header/>
      <div className='flex flex-1 overflow-hidden'>
      {
        isEditing&&<Sidebar/>
      }
        <div className='flex-1 flex flex-col overflow-hidden relative'>
          <main className='flex-1 overflow-hidden bg-[#f0f0f0] flex items-center justify-center'>
            <Canvas/>
          </main>
        </div>
          {
              showProperties&&isEditing&&<Properties/>
          }
          <PremiumModal isOpen={showPremiumModal} onClose={setShowPremiumModal} />

      </div>
    </div>
  )
}

export default MainEditor