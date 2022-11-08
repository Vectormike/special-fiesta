/* eslint-disable no-console */
/* eslint-disable no-undef */
const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * List Products in descending order of 'createdAt' timestamp.
 * @param {number} limit - Limit number of Products to be returned.
 * @returns {Promise<Product[]>}
 */
const listProducts = async (limit) => {
  const products = await Product.paginate({}, { limit });
  return products;
};

/**
 * Create a Product
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const createProduct = async (productBody) => {
  // Check if product already exists
  if (await Product.isProductNameTaken(productBody.productName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product already exists');
  }

  // Generate productID
  const productID = await Product.generateProductID();

  // Create product
  const product = await Product.create({ ...productBody, productID });
  return product;
};

const getProductById = async (productId) => {
  return Product.findOne({ productID: productId });
};

/**
 * Edit product by id
 * @param {ObjectId} productId
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const editProductById = async (productId, productBody) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  if (await Product.isProductNameTaken(productBody.productName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product already exists');
  }
  Object.assign(product, productBody);
  await product.save();
  return product;
};

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<User>}
 */
const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.remove();
  return product;
};

module.exports = {
  listProducts,
  createProduct,
  editProductById,
  deleteProductById,
};
