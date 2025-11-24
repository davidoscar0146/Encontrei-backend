const reservationModel = require('../models/reservationModel')
const productModel = require('../models/productModel')

module.exports = {
  listReservations: () => reservationModel.findAll(),
  async createReservation(data) {
    // validações simples
    const product = await productModel.findById(data.productId)
    if (!product) throw new Error('Produto não encontrado')

    // sellerId vem da loja do produto
    const sellerId = product.store.sellerId

    return reservationModel.create({
      productId: Number(data.productId),
      buyerId: Number(data.buyerId),
      sellerId,
      date: new Date(data.date),
      status: 'AGUARDANDO_RETIRADA',
      note: data.note || null,
    })
  }
}
