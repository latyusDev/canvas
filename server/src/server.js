require('dotenv').config();
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet');
const designRouter = require('./routes/design-routes');
const uploadRouter = require('./routes/upload-routes');
const subscriptionRouter = require('./routes/subscription-route');
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('db connected'))
.catch((e)=>console.log(e))


const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:true}));


app.use('/api/designs',designRouter)
app.use('/api/media',uploadRouter)
app.use('/api/subscription',subscriptionRouter)


app.listen(PORT,()=>console.log('app is running at port '+PORT))