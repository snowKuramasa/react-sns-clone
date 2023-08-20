const router = require('express').Router()
const User = require('./models/User')

//ユーザ登録
router.post('/register', async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
    const result = await newUser.save()

    return res.status(201).json(result)
  } catch (err) {
    return res.status(500).json(err)
  }
})

//server.jsのURIをルートとしている
// router.get('/', (req, res) => {
//   res.send('auth router')
// })

module.exports = router
