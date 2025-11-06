const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authMiddleware = async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    console.log(authHeader,'header')

    const token = authHeader&&authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({
            error:'Access denied, no token provided'
        });
    }

    try{
        const ticket = await client.verifyIdToken({
            idToken:token,
            audience:process.env.GOOGLE_CLIENT_ID
        })
        const payload = ticket.getPayload();
        // add user info to req.user;
        req.user = {
            userId:payload['sub'],
            email:payload['email'],
            name:payload['name']
        }

        // add user id to  headers for downstream services;
        req.headers['x-user-id'] = payload['sub']

        // optional
        req.headers['x-user-email'] = payload['email']
        req.headers['x-user-name'] = payload['name']
        console.log(req.user)
        next();
    }catch(err){
        console.error('token verification failed '+err)
        return res.status(403).json({message:'session expired'})
    }
}

module.exports = authMiddleware