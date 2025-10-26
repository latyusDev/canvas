const express = require('express');
const subscriptionRouter = express.Router();
const {getSubscription} = require('../controllers/subscription-controller');
const authMiddleware = require('../middleware/auth-middleware')


subscriptionRouter.use(authMiddleware);

subscriptionRouter.get('/',getSubscription)

module.exports = subscriptionRouter;