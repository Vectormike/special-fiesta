const mongoose = require('mongoose');
const faker = require('@faker-js/faker');
const Product = require('../../src/models/product.model');

const productName = faker.commerce.productName();

const productOne = {
  _id: mongoose.Types.ObjectId(),
  productName,
  productID: faker.commerce().productID(),
  price: faker.commerce().price(),
};

const productTwo = {
  _id: mongoose.Types.ObjectId(),
  productName: faker.commerce.productName(),
  productID: faker.commerce.productID(),
  price: faker.commerce.price(),
};

const insertProducts = async (products) => {
  await Product.insertMany(products.map((product) => ({ ...product })));
};

module.exports = {
  productOne,
  productTwo,
  insertProducts,
};
