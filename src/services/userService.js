const userModel = require('../models/userModel')

module.exports = {
  listUsers: () => userModel.findAll(),
  getUser: (id) => userModel.findById(id),
  createUser: (data) => userModel.create(data),
}
