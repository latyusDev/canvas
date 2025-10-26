const axios = require('axios');
const {uploadMediaToCloudinary} = require('../utils/cloudinary');
const Media = require('../models/Media')

const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
const STABILITY_ENGINE_ID = 'stable-diffusion-xl-1024-v1-0'; 
const STABILITY_API_HOST = 'https://api.stability.ai';

const generateImageFromAiAndUploadToDb = async(req,res)=>{
    const prompt = req.body.prompt;
    const userId = req.user.userId;

    try{
        const response = await axios.post(
            `${STABILITY_API_HOST}/v1/generation/${STABILITY_ENGINE_ID}/text-to-image`,
            {
                text_prompts:[
                    {
                        text: prompt,
                        weight: 1
                    }
                ],
                height: 1024,
                width: 1024,
                steps: 30,
                samples: 1,
                cfg_scale: 7,
            },
            {
                headers:{
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${STABILITY_API_KEY}`
                }
            }
        );

        const generatedImage = response.data.artifacts[0];
        if(!generatedImage){
            throw new Error('no image generated from Ai')
        }
        
        const imageBuffer = Buffer.from(generatedImage.base64, 'base64');
        const file = {
            buffer: imageBuffer,
            originalName: `ai-generated-${Date.now()}.png`,
            mimetype: 'image/png',
            size: imageBuffer.length,
            width: 1024,
            height: 1024
        }

        const cloudinaryResult = await uploadMediaToCloudinary(file);
        const newlyCreatedMedia = new Media({
            userId,
            name: `AI Generated ${prompt.substring(0,50)}${prompt.length>50?'...':''}`,
            cloudinaryId: cloudinaryResult.public_id,
            url: cloudinaryResult.secure_url,
            mimeType: 'image/png',
            size: imageBuffer.length,
            width: 1024,
            height: 1024
        })
        
        await newlyCreatedMedia.save()
        
        return res.status(200).json({
            success: true,
            data: newlyCreatedMedia,
            seed: generatedImage.seed,
            message: 'AI image generated and uploaded to db successfully'
        })
    }catch(e){
        console.log('Error details:', e.response?.data || e.message);
        
        return res.status(500).json({
            success: false,
            message: 'Fetch from AI and upload to DB failed. Try again.',
            error: e.response?.data?.message || e.message
        })
    }
}


// const generateImageFromAiAndUploadToDb = async(req,res)=>{
//     const prompt = req.body.prompt;
//     const userId = req.user.userId;

//     try{
//         const response = await axios.post(`${STABILITY_API_HOST}/v1/generation/${STABILITY_ENGINE_ID}/text-to-image`,{
//             text_prompts:[
//                 {
//                     text:prompt
//                 }
//             ],
//             height:1024,
//             width:1024,
//             steps:30,
//             samples:1,
//             cfg_scale:7,
            
//         },{
//             headers:{
//                 'Content-Type':'application/json',
//                 Accept:'application/json',
//                 Authorization:`Bearer ${STABILITY_API_KEY}`
//             }
//         });

//         const generatedImage = response.data.artifacts[0];
//         if(!generatedImage){
//             throw new Error('no image generated from Ai')
//         }
//         const imageBuffer = Buffer.from(generatedImage.base64,'base64');
//         const file = {
//             buffer:imageBuffer,
//             originalName:`ai-generated-${Date.now()}.png`,
//             mimetype:'image/png',
//             size:imageBuffer.length,
//             width:1024,
//             height:1024
//         }

//         const cloudinaryResult = await uploadMediaToCloudinary(file);
//         const newlyCreatedMedia =new Media( {
//             userId,
//             name:`AI Generated ${prompt.substring(0,50)}${prompt.length>50?'...':''}`,
//             cloudinaryId:cloudinaryResult.public_id,
//             url:cloudinaryResult.secure_url,
//             mimeType:'image/png',
//             size:imageBuffer.length,
//             width:1024,
//             height:1024

//         })
//         await newlyCreatedMedia.save()
//         return res.status(200).json({
//             success:true,
//             data:newlyCreatedMedia,
//             seed:generatedImage.seed,
//             message:'Ai image generated and uploaded to db successfully'
//         })
//     }catch(e){
//         console.log(e);
        
//         return res.status(500).json({
//             success:false,
//             message:'fetch from AI and upload to DB failed try again'
//         })
//     }

// } 

module.exports = {generateImageFromAiAndUploadToDb}