const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { productService } = require('../services');

const listProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['productName', 'productID']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.listProducts(filter, options);
  res.status(httpStatus.OK).send(result);
});

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send(product);
});

const editProduct = catchAsync(async (req, res) => {
  const product = await productService.editProductById(req.params.productId, req.body);
  res.status(httpStatus.OK).send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.productId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  listProducts,
  createProduct,
  editProduct,
  deleteProduct,
};
