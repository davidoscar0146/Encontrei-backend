const prisma = require('./prisma')

module.exports = {
  findAll: () => prisma.store.findMany({ include: { seller: true, products: true } }),
  findById: (id) => prisma.store.findUnique({ where: { id: Number(id) }, include: { products: true } }),
  create: (data) => prisma.store.create({ data }),
}
