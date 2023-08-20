const router = require('express').Router()

//server.jsのURIをルートとしている
router.get('/', (req, res) => {
  res.send('posts router')
})

module.exports = router
