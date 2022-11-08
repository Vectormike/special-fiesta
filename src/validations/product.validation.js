const Joi = require('joi');
const { objectId } = require('./custom.validation');

const listProducts = {
  query: Joi.object().keys({
    productName: Joi.string(),
    productID: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const createProduct = {
  body: Joi.object().keys({
    productName: Joi.string().required(),
    price: Joi.number().required(),
  }),
};

const editProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      productName: Joi.string(),
      price: Joi.number(),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  listProducts,
  createProduct,
  editProduct,
  deleteProduct,
};
