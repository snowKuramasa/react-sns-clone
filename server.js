const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require('mongoose')

//dotenvライブラリで.envファイル読み込み
require('dotenv').config()

//ルーター呼び出し
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const postsRouter = require('./routes/posts')

//mongodb接続
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log('DBと接続中・・・')
  })
  .catch((err) => {
    console.log(err)
  })

//ミドルウェア
//ベースURIの割り当て
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/posts', postsRouter)

//エンドポイント
app.get('/', (req, res) => {
  res.send('hello express')
})

// app.get('/users', (req, res) => {
//   res.send('hello users')
// })

app.listen(PORT, () => console.log('サーバー起動:http://localhost:3000/'))
