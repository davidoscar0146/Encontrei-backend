const storeModel = require('../models/storeModel')

module.exports = {
  listStores: () => storeModel.findAll(),
  getStore: (id) => storeModel.findById(id),
  createStore: (data) => storeModel.create(data),
}
