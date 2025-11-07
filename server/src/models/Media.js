const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
    userId:String,
    name:String,
    cloudinaryId:String,
    url:String,
    mimeType:String,
    size:Number,
    width:Number,
    height:Number,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Media = mongoose.model.Media ||mongoose.model('Media',MediaSchema)

module.exports = Media;