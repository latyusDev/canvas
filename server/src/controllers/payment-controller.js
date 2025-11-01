const Subscription = require('../models/Subscription');
const axios = require('axios');

const PAYPAL_API = process.env.NODE_ENV === 'production'
    ? 'https://api-m.paypal.com' 
    : 'https://api-m.sandbox.paypal.com'; 
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const CLIENT_SECRET = process.env.PAYPAL_API_SECRET 
const FRONTEND_URL = process.env.FRONTEND_URL||'http://localhost:3000'

// create paypal order
async function getAccessToken(){
    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    const response = await axios({
        method:'post',
        url:`${PAYPAL_API}/v1/oauth2/token`,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded', 
            Authorization:`Basic ${auth}`,
        },
        data:'grant_type=client_credentials'
    })
    return response.data.access_token;
}

const createOrder = async(req,res)=>{
    try{
        const {userId} = req.user;
        const accessToken = await getAccessToken();
        const response = await axios ({
            method:'post',
            url:`${PAYPAL_API}/v2/checkout/orders`,
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${accessToken}`,
            },  // <-- Missing closing brace here
            data:{
                intent:'CAPTURE',
                purchase_units:[
                    {
                        amount:{
                            currency_code:'USD',
                            value:'500'
                        },
                        description:'Canva Premium Membership',
                    }
                ],
                application_context:{  
                    return_url:`${FRONTEND_URL}/subscription/success`,
                    cancel_url:`${FRONTEND_URL}/subscription/cancel`
                }
            }
        })

        //get order
        const order = response.data;
        // get approval link
        const approvalLink = order.links.find(link=>link.rel === 'approve').href;
        res.status(200).json({
            success:true,
            data:{
                orderId:order.id,
                approvalLink
            }
        })

    }catch(e){
        res.status(500).json({
            success:false,
            message:'Error while creating paypal order',
            error:e
        })
        console.log(e)
    }
}

 
// const capturePayment = async(req,res)=>{
//     try{
//         const {orderId} = req.body;
//         const {userId} = req.user;
//         console.log('hit')

//         const accessToken = await getAccessToken();
//         const response = await axios({
//         method:'post',
//         url:`${PAYPAL_API}/v1/checkout/orders/${orderId}/capture`,
//         headers:{
//             'Content-Type':'application/x-www-form-urlencoded', 
//              Authorization:`Basic ${accessToken}`,
//         }
//     })

//     const captureData = response.data;
//     const captureId = captureData.purchase_units[0].payments.captures[0].id;
//     let subscription = await Subscription.findOne({userId});
//     if(!subscription){
//         subscription = new Subscription({userId});
//     }
//     subscription.isPremium = true;
//     subscription.premiumSince = new Date();
//     subscription.paymentId = captureId;
//     await subscription.save();
//     return res.status(200).json({
//         success:true,
//         data:{
//             isPremium:true,
//             paymentId:captureId
//         }
//     })

//     }catch(e){
//         res.status(500).json({
//             success:false,
//             message:'Error while capturing paypal order'
//         })
//         console.log(e)
//     }
// }


const capturePayment = async (req, res) => {
    try {
        const { orderId } = req.body;
        const { userId } = req.user;
        console.log('Capturing payment for order:', orderId)

        const accessToken = await getAccessToken();
        
        const response = await axios({
            method: 'post',
            url: `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            }
        })

        const captureData = response.data;
        console.log('Capture response:', captureData)

        // Check if capture was successful
        if (captureData.status !== 'COMPLETED') {
            return res.status(400).json({
                success: false,
                message: 'Payment capture failed'
            })
        }

        // Correct path to capture ID
        const captureId = captureData.purchase_units[0].payments.captures[0].id;

        // Find or create subscription
        let subscription = await Subscription.findOne({ userId });
        if (!subscription) {
            subscription = new Subscription({ userId });
        }

        // Update subscription
        subscription.isPremium = true;
        subscription.premiumSince = new Date();
        subscription.paymentId = captureId;
        
        // Save instance, not Model
        await subscription.save();

        return res.status(200).json({
            success: true,
            data: {
                isPremium: true,
                paymentId: captureId
            }
        })

    } catch (e) {
        console.error('PayPal capture error:', e.response?.data || e.message)
        
        res.status(500).json({
            success: false,
            message: 'Error while capturing paypal order',
            error: e.response?.data?.message || e.message
        })
    }
}

const verifyPayment = async(req,res)=>{
    try{

    }catch(e){
        res.status(500).json({
            success:false,
            message:'Error while capturing paypal order',
            error:e
        })
        console.log(e)
    }
}


module.exports = {createOrder,verifyPayment,capturePayment}