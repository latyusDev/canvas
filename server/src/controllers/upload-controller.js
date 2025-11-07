const {uploadMediaToCloudinary} = require('../utils/cloudinary');
const Media = require('../models/Media');

const uploadMedia = async(req,res)=>{
    try{

        if(!req.file){
            return res.status(400).json({
                message:'No file found',
                success:false
            })
        }

        const {originalname,mimeType,size,width,height} = req.file;
        const {userId} = req.user;
        const cloudinaryResponse = await uploadMediaToCloudinary(req.file);
        const newlyCreatedMedia = new Media({
            userId,
            name:originalname,
            cloudinaryId:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url,
            mimeType,
            size,
            width,
            height
        });


        // console.log(cloudinaryResponse)
        
        await newlyCreatedMedia.save();
        res.status(201).json({
            success:true,
            data:newlyCreatedMedia
        })
     }catch(e){
        console.error(e)
         res.status(422).json({
            success:false,
            message:'Error creating asset'
        })
    }
}

const getAllMediaByUser = async(req,res)=>{
    console.log(typeof req.user.userId)
    try{
        // const medias = await Media.find({
        //     userId:req.user.userId
        // }).sort({createdAt:-1})
        const medias = await Media.find({})
        console.log(medias)
        return res.status(200).json({
            success:false,
            data:medias
        })
    }catch(e){
         console.error(e)
         res.status(500).json({
            success:false,
            message:'Failed to fet assets'
        })
    }
}

module.exports = {uploadMedia,getAllMediaByUser}