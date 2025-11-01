const express = require('express');
const subscriptionRouter = express.Router();
const {getSubscription} = require('../controllers/subscription-controller');
const {createOrder, capturePayment} = require('../controllers/payment-controller');
const authMiddleware = require('../middleware/auth-middleware')


subscriptionRouter.use(authMiddleware);

subscriptionRouter.get('/',getSubscription);
subscriptionRouter.post('/create-order',createOrder);
subscriptionRouter.post('/capture-order',capturePayment);

module.exports = subscriptionRouter;