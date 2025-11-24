const express = require('express')
const router = express.Router()
const reservationService = require('../services/reservationService')

router.get('/', async (req, res) => {
  try {
    const reservations = await reservationService.listReservations()
    res.json(reservations)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { productId, buyerId, date, note } = req.body
    if (!productId || !buyerId || !date) return res.status(400).json({ error: 'productId, buyerId e date são obrigatórios' })

    const reservation = await reservationService.createReservation({ productId, buyerId, date, note })
    res.status(201).json(reservation)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
