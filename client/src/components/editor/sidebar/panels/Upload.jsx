import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addImageToCanvas } from '@/fabric/fabric-utils';
import { fetchWithAuth } from '@/services/base-service';
import { uploadFileWithAuth } from '@/services/upload-service';
import { useEditorStore } from '@/store/useEditorStore'
import { Loader2, UploadIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react'

const Upload = () => {
  const {canvas} = useEditorStore();
  const [isUploading,setIsUploading] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [userUploads,setUserUploads] = useState([]);

  const {data:session,status} = useSession();

const fetchUserUploads = useCallback(async()=>{
    if(status !== 'authenticated' || !session?.idToken) return ;

    try{
        setIsLoading(true);
        const result = await fetchWithAuth('/api/media');
        setUserUploads(result?.data)
        console.log(result,'here')
        setIsLoading(false);

    }catch(e){
      console.error(e)
    }
},[status,session?.idToken])

  useEffect(()=>{
      if(status === 'authenticated'){
        fetchUserUploads()
      }
  },[status,fetchUserUploads])

  const handleFileUpload = async(e)=>{
    const file = e.target.files[0]
    // console.log()
    setIsUploading(true);
    try{
        const result = await uploadFileWithAuth(file)
        setUserUploads([...userUploads,result?.data])
    }catch(e){
        console.log('error uploading a file '+e)
    }finally{
      setIsUploading(false);
    }
  }

  const handleAddImage = (imageUrl)=>{
      if(!canvas) return ;
      addImageToCanvas(canvas,imageUrl)

  }

  return (
    <div className='h-full overflow-y-auto'>
        <div className='p-4 space-y-4'>
            <div className='flex gap-2'>
              <Label className={`w-full flex items-center 
               justify-center gap-2 text-white rounded-md pointer-cursor h-12 font-medium 
               transition-colors py-3 px-4 bg-purple-600 hover:bg-purple-700 ${isUploading?'opacity-70 cursor-not-allowed':''}`}>
                  <UploadIcon className='w-5 h-5' />
                  <span>{isUploading?'uploading...':'upload files'}</span>
                  <Input type='file'
                   className='hidden' accept='image/*'
                   onChange={handleFileUpload}
                   disabled={isUploading}
                   />
              </Label>
            </div>
            <div className='mt-5'>
              <h4 className='mb-5'>your uploads</h4>
              {
                isLoading?<div className='border p-6 flex rounded-md items-center justify-center'>
                  <Loader2 calcMode='w-4 h-4'/>
                    <p className='text-sm font-bold '>loading your uploads...</p>
                </div>:
                  userUploads?.length > 0 ? <div className='grid grid-cols-3 gap-4'>
                      {userUploads.map(upload=>(
                        <div key={upload._id} onClick={()=>handleAddImage(upload.url)} className='aspect-auto bg-gray-50 rounded-md overflow-hidden hover:opacity-85 transition-opacity ralative group'>
                          <img src={upload.url} alt={upload.name} className='w-full h-full object-cover'/>

                        </div>
                      ))}
                  </div>: <div> no uploads</div>
              }
            </div>
        </div>
    </div>
  )
}

export default Upload