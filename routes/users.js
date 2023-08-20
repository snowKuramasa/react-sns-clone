const router = require('express').Router()

//server.jsのURIをルートとしている
router.get('/', (req, res) => {
  res.send('user router')
})

router.get('/profile', (req, res) => {
  res.send('user router profile')
})

module.exports = router
