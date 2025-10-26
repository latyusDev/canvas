import axios from "axios";
import { fetchWithAuth } from "./base-service";

const { getSession } = require("next-auth/react");

const uploadFileWithAuth = async(file, metaData = {}) => {
    const session = await getSession();
    if(!session) {
        throw new Error('Not authenticated');
    }

    const formData = new FormData();
    formData.append('file', file)
    console.log(file)

    Object.entries(metaData).forEach(([key, value]) => {
        formData.append(key, value)
    })

    try {
        const response = await axios.post(`http://localhost:5000/api/media/upload`, formData, {
            headers: {
                Authorization: `Bearer ${session.idToken}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(response, 'upload-service')
        
        return response.data; 
        
    } catch(e) {
        console.error('Upload error:', e.response?.data || e.message);
        throw new Error(e.response?.data?.message || 'Upload failed')
    }
}


const generateImageFromAi = async(prompt)=>{
    try{
        const response = await fetchWithAuth('/api/media/ai-image-generate',{
            method:'POST',
            body:{
                prompt
            }
        })
        return response
    }catch(e){
        console.log(e)
    }
}

export {generateImageFromAi,uploadFileWithAuth}