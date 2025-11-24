const prisma = require('./prisma')

module.exports = {
  findAll: () => prisma.user.findMany({ include: { stores: true } }),
  findById: (id) => prisma.user.findUnique({ where: { id: Number(id) } }),
  create: (data) => prisma.user.create({ data }),
}
