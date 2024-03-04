const express= require('express');
const router = express.Router();

const productsController = require('../controllers/ProductsController');

router.get('/produtos', productsController.getProducts);

router.post('/produtos', productsController.postProducts);

router.get('/produto/:produtoId', productsController.getProductId);

router.patch('/produto/:produtoId', productsController.patchProduct);

router.delete('/produto/:produtoId', productsController.deleteProduct);


module.exports = router;