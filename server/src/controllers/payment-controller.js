const Subscription = require('../models/Subscription');
const axios = require('axios');

const PAYPAL_API = process.env.NODE_ENV === 'production'?'htpps://api-m.paypal.com':'https://api-m.sandbox.paypal.com'
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET 
const FRONTEND_URL = process.env.FRONTEND_URL||'http://localhost:3000'