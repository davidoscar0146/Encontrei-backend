const productModel = require('../models/productModel')

module.exports = {
  listProducts: () => productModel.findAll(),
  getProduct: (id) => productModel.findById(id),
  createProduct: (data) => productModel.create(data),
}
