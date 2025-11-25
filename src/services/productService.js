// src/services/productService.js
const productModel = require("../models/productModel");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime/library");

module.exports = {
  async create(data) {
    if (!data.name || !data.storeId) {
      throw new Error("Nome e storeId são obrigatórios.");
    }

    return productModel.create(data);
  },

  async getAll() {
    return productModel.findAll();
  },

  async getById(id) {
    const product = await productModel.findById(id);
    if (!product) throw new Error("Produto não encontrado");
    return product;
  },

  async update(id, data) {
    const existing = await productModel.findById(id);
    if (!existing) throw new Error("Produto não encontrado");
    return productModel.update(id, data);
  },

  async delete(id) {
    try {
      return await productModel.remove(id);
    } catch (error) {
      // Se o delete falhar por foreign key (reservas)
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2003") {
        throw new Error("Não é possível remover: o produto possui reservas vinculadas.");
      }
      throw error;
    }
  }
};
