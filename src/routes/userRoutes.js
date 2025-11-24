const express = require('express')
const router = express.Router()
const userService = require('../services/userService')

router.get('/', async (req, res) => {
  try {
    const users = await userService.listUsers()
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id)
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
