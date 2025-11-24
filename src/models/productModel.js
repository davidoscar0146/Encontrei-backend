const prisma = require('./prisma')

module.exports = {
  findAll: () => prisma.product.findMany({ include: { store: true } }),
  findById: (id) => prisma.product.findUnique({ where: { id: Number(id) }, include: { store: true } }),
  create: (data) => prisma.product.create({ data }),
}
