const express = require('express');
const designRouter = express.Router();
const designController = require('../controllers/design-controller');
const authMiddleware = require('../middleware/auth-middleware')


designRouter.use(authMiddleware);

designRouter.get('/',designController.getUserDesigns)
designRouter.get('/:id',designController.getDesignById)
designRouter.post('/',designController.saveDesign)
designRouter.delete('/',designController.deleteDesign);


module.exports = designRouter;