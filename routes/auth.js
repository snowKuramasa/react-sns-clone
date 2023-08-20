const router = require('express').Router()
const User = require('../models/User')

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

//ログイン
//（TODO:パスワードはbcryptライブラリなどでハッシュ化させる）https://www.npmjs.com/package/bcrypt
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) return res.status(404).send('ユーザーが見つかりません')

    //パスワードが一致しているか確認
    const vailedPassword = req.body.password == user.password
    if (!vailedPassword) return res.status(404).send('パスワードが違います')

    //認証完了
    return res.status(201).json(user)
  } catch (err) {
    return res.status(500).json(err)
  }
})

//server.jsのURIをルートとしている
// router.get('/', (req, res) => {
//   res.send('auth router')
// })

module.exports = router
