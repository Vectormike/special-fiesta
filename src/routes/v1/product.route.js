const express = require('express');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router.route('/').get(validate(productValidation.listProducts), productController.listProducts);
router.route('/').post(validate(productValidation.createProduct), productController.createProduct);
router.route('/:productId').patch(validate(productValidation.editProduct), productController.editProduct);
router.route('/:productId').delete(validate(productValidation.deleteProduct), productController.deleteProduct);

module.exports = router;
