const router = require('express').Router()

//server.jsのURIをルートとしている
router.get('/', (req, res) => {
  res.send('auth router')
})

module.exports = router
