const express = require('express')
const router = express.Router()
const productService = require('../services/productService')

router.get('/', async (req, res) => {
  try {
    const products = await productService.listProducts()
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const product = await productService.getProduct(req.params.id)
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
