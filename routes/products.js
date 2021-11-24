const productController = require('../controllers/products.js')
const express = require('express')
const Product = require('../models/Product.js')
const router = express.Router()

router.get('/products',productController.getProducts)
router.post('/products',productController.postProduct)
router.get('/products/:id',productController.getSingleProduct)
router.post('/products/:id/variation',productController.addProductVariation)
router.get('/products/:id/variations',productController.getProductVariation)
router.delete('/products/:id',productController.deleteProduct)


module.exports = router;