const router = require('express').Router()
const User = require('../models/User')

//ユーザ情報の取得
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    //分割代入でuser._docからpassword、updatedAtを変数として取り出し、残りをother変数に代入
    const { password, updatedAt, ...other } = user._doc

    // password, updatedAtのみを取り除いたデータのみ送信
    return res.status(200).json(other)
  } catch (err) {
    return res.status(500).json(err)
  }
})

//ユーザ情報の更新
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        //$setはUserコレクションの全てのキーを指す（bodyの内容ですべて書き換え）
        $set: req.body,
      })

      return res.status(200).json('ユーザ情報が更新されました')
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    return res
      .status(403)
      .json('あなたは自分のアカウントの時にのみ情報を更新できます')
  }
})

//ユーザ情報の削除
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      //削除処理を実行
      const user = await User.findByIdAndDelete(req.params.id)

      return res.status(200).json('ユーザ情報が削除されました')
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    return res
      .status(403)
      .json('あなたは自分のアカウントの時にのみ情報を削除できます')
  }
})

//server.jsのURIをルートとしている
// router.get('/', (req, res) => {
//   res.send('user router')
// })

// router.get('/profile', (req, res) => {
//   res.send('user router profile')
// })

module.exports = router
