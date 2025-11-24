const prisma = require('./prisma')

module.exports = {
  findAll: () => prisma.reservation.findMany({ include: { product: true, buyer: true, seller: true } }),
  findById: (id) => prisma.reservation.findUnique({ where: { id: Number(id) }, include: { product: true, buyer: true, seller: true } }),
  create: (data) => prisma.reservation.create({ data }),
}
