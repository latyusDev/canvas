const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    userId:String,
    isPremium:{
        type:Boolean,
        default:false
    },
    paymentId:String,
    premiumSince:Date,

},{
    timestamps:true
})


const Subscription = mongoose.models.SubsriptionSchema||mongoose.model('Subscription',SubscriptionSchema)

module.exports = Subscription;