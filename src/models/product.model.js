const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    productID: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

// Check if productName is taken
productSchema.statics.isProductNameTaken = async function (productName, excludeProductId) {
  const product = await this.findOne({ productName, _id: { $ne: excludeProductId } });
  return !!product;
};

// Generate productID
productSchema.statics.generateProductID = async function () {
  const productID = Math.floor(100000 + Math.random() * 900000);
  const product = await this.findOne({ productID });
  if (product) {
    return this.generateProductID();
  }
  return productID;
};

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
