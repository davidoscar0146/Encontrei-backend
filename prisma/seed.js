const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // limpando dados existentes
  await prisma.reservation.deleteMany().catch(()=>{})
  await prisma.product.deleteMany().catch(()=>{})
  await prisma.store.deleteMany().catch(()=>{})
  await prisma.user.deleteMany().catch(()=>{})

  // Usuários
  const users = await Promise.all([
    prisma.user.create({ data: { name: 'Mariana Souza', email: 'mariana.souza@gmail.com', password: 'senha123', phone: '(81) 98888-0001', userType: 'COMPRADOR', createdAt: new Date('2025-02-10') } }),
    prisma.user.create({ data: { name: 'Ana Costa', email: 'ana.costa@modamei.com', password: 'senha123', phone: '(81) 98888-0002', userType: 'VENDEDOR', createdAt: new Date('2025-02-11') } }),
    prisma.user.create({ data: { name: 'Dona Maria MEI', email: 'donamaria.boutique@gmail.com', password: 'senha123', phone: '(81) 98888-0003', userType: 'VENDEDOR', createdAt: new Date('2025-02-12') } }),
    prisma.user.create({ data: { name: 'João Lima', email: 'joao.lima@gmail.com', password: 'senha123', phone: '(81) 98888-0004', userType: 'COMPRADOR', createdAt: new Date('2025-02-12') } })
  ])

  const [mariana, ana, donaMaria, joao] = users

  // Lojas
  const lojas = await Promise.all([
    prisma.store.create({ data: { sellerId: ana.id, name: 'Ana Costa Modas', cpfCnpj: '123.456.789-00', segment: 'Moda Feminina Casual', distance: '5km' } }),
    prisma.store.create({ data: { sellerId: donaMaria.id, name: 'Boutique da Maria', cpfCnpj: '987.654.321-00', segment: 'Moda Festa + Conjuntinhos', distance: '10km' } })
  ])

  const [lojaAna, lojaMaria] = lojas

  // Produtos
  const products = await Promise.all([
    prisma.product.create({ data: { storeId: lojaAna.id, name: 'Vestido Floral Curto', category: 'Vestido', price: 89.90, stock: 12, sizes: 'P, M, G', colors: 'Azul, Rosa' } }),
    prisma.product.create({ data: { storeId: lojaAna.id, name: 'Blusa Ombro a Ombro', category: 'Blusas', price: 59.90, stock: 20, sizes: 'P, M', colors: 'Branco, Preto' } }),
    prisma.product.create({ data: { storeId: lojaMaria.id, name: 'Conjunto Social Feminino', category: 'Conjunto', price: 149.90, stock: 8, sizes: 'M, G', colors: 'Preto' } }),
    prisma.product.create({ data: { storeId: lojaMaria.id, name: 'Vestido Festa Longo', category: 'Festa', price: 229.90, stock: 5, sizes: 'M', colors: 'Vermelho, Azul' } })
  ])

  // Reservas
  await prisma.reservation.create({ data: { productId: products[0].id, buyerId: mariana.id, sellerId: lojaAna.sellerId, date: new Date('2025-02-15'), status: 'AGUARDANDO_RETIRADA', note: 'Cliente solicitou provar na loja' } })
  await prisma.reservation.create({ data: { productId: products[3].id, buyerId: joao.id, sellerId: lojaMaria.sellerId, date: new Date('2025-02-15'), status: 'CONFIRMADA', note: 'Reserva válida por 24h' } })
  await prisma.reservation.create({ data: { productId: products[1].id, buyerId: mariana.id, sellerId: lojaAna.sellerId, date: new Date('2025-02-16'), status: 'CANCELADA', note: 'Cliente desistiu' } })
  await prisma.reservation.create({ data: { productId: products[2].id, buyerId: joao.id, sellerId: lojaMaria.sellerId, date: new Date('2025-02-17'), status: 'EXPIRADA', note: 'Não retirou no prazo' } })

  console.log('Seed completo')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
