const express = require('express');
const subscriptionRouter = express.Router();
const {getSubscription} = require('../controllers/subscription-controller');
const {createOrder} = require('../controllers/payment-controller');
const authMiddleware = require('../middleware/auth-middleware')


subscriptionRouter.use(authMiddleware);

subscriptionRouter.get('/',getSubscription);
subscriptionRouter.post('/create-order',createOrder);

module.exports = subscriptionRouter;