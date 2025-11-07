const Design = require('../models/Design');


const getUserDesigns = async(req,res)=>{
    const {userId} = req.user 
    try{
        const designs = await Design.find()
                                    .sort({updatedAt:-1}) 
        return res.status(200).json({
            success:true,
            data:designs
        })

    }catch(e){
        console.log('Error while fetching the design '+e);
        return res.status(500).json({success:false,message:'Failed to fetch design '+' user id '+userId+e})
    }
}
const getDesignById= async(req,res)=>{
    const {userId} = req.params 
    const designId = req.params.id
    try{

        const designs = await Design.findOne({userId,_id:designId})
                                    .sort({updatedAt:-1});
        if(!designs){
            res.status(404).json({
                success:false,
                message:'Design not found or no permission to view it'
            });
        }
        return res.status(200).json({
            success:true,
            data:designs
        })

    }catch(e){
        console.error('Error while retrieving the design '+e);
        return res.status(500).json({success:false,message:'Failed to save design'})
    }
}

const saveDesign = async(req,res)=>{
    const {userId} = req.params;
    const {designId,name,canvasData,width,height,category} = req.body

    try{
        if(designId){
            const design = await Design.findOne({userId,_id:designId})
                                        .sort({updatedAt:-1});
                if(name) design.name = name
                if(canvasData) design.canvasData = canvasData
                if(width) design.width = width
                if(height) design.height = height
                if(category) design.category = category
                design.updatedAt = Date.now();

                const updatedDesign = await design.save();
                return res.status(200).json({
                    success:true,
                    data:updatedDesign
                })
        }else{
            const newDesign = new Design({
                userId,
                name:name||'untitle',
                width,
                height,
                canvasData,
                category
            })
            const saveDesign = await newDesign.save();
              return res.status(200).json({
                    success:true,
                    data:saveDesign
                })
        }
        
    }catch(e){
        console.error(e);
        return res.status(500).json({success:false,message:'Failed to create designs'})
    }
}

const updateDesign = async(req,res)=>{
    try{

    }catch(e){
        console.error(e);
        return res.status(500).json({success:false,message:'Failed to fetch designs'})
    }
}

const deleteDesign = async(req,res)=>{
    const designId = req.params.id
    const userId =req.user.userId
    try{
        const design = await Design.findById(designId)
            if(!design){
                return  res.status(404).json({
                        success:false,
                        message:'Design not found or no permission to delete it'
            });
            }

            await Design.findByIdAndDelete(designId)
            res.status(200).json({success:true,message:'Design deleted successfully '})
    }catch(e){
        console.error(e);
        return res.status(500).json({success:false,message:'Failed to fetch designs'})
    }
}


const searchDesign = async(req, res) => {
    try {
        const searchTerm = req.query.name;
        console.log(searchTerm)
        
        if (!searchTerm) {
            return res.status(400).json({
                success: false, 
                message: 'Search term is required'
            });
        }

        const results = await Design.find({
            name: { $regex: searchTerm, $options: 'i' }
        });

        return res.status(200).json({
            success: true,
            data: results,
            total: results.length
        });

    } catch(e) {
        console.log(e);
        return res.status(500).json({
            success: false, 
            message: 'Failed to search designs'
        });
    }
}
module.exports = {deleteDesign,updateDesign,saveDesign,
    getDesignById,getUserDesigns,searchDesign}