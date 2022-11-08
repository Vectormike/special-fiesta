const request = require('supertest');
const faker = require('@faker-js/faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { Product } = require('../../src/models');
const { productOne, productTwo, insertProducts } = require('../fixtures/product.fixture');

setupTestDB();

describe('Product routes', () => {
  describe('POST /spiralyze/product', () => {
    test('should return 201 and successfully create new product if data is ok', async () => {
      await insertProducts([productOne]);

      const res = await request(app).post('/spiralyze/product').send(productOne).expect(httpStatus.CREATED);

      expect(res.body).not.toHaveProperty('productID');
      expect(res.body).not.toHaveProperty('productName');
      expect(res.body).not.toHaveProperty('price');
    });
  });
});
