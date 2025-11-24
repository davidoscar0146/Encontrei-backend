const express = require('express')
const router = express.Router()
const storeService = require('../services/storeService')

router.get('/', async (req, res) => {
  try {
    const stores = await storeService.listStores()
    res.json(stores)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const store = await storeService.getStore(req.params.id)
    if (!store) return res.status(404).json({ error: 'Loja não encontrada' })
    res.json(store)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
