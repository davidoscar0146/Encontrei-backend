const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  async create(data) {
    return prisma.product.create({ data });
  },

  async findAll() {
    return prisma.product.findMany();
  },

  async findById(id) {
    return prisma.product.findUnique({
      where: { id: Number(id) },
    });
  },

  async findByStore(storeId) {
    return prisma.product.findMany({
      where: { storeId: Number(storeId) },
    });
  },

  async update(id, data) {
    return prisma.product.update({
      where: { id: Number(id) },
      data,
    });
  },

  async remove(id) {
    return prisma.product.delete({
      where: { id: Number(id) }
    });
  },
};
