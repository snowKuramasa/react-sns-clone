const express = require('express')
const app = express()
const PORT = 3000

//ルーター呼び出し
const usersRouter = require('./routes/users')

//ミドルウェア
//ベースURI
app.use('/api/users', usersRouter)

//エンドポイント
app.get('/', (req, res) => {
  res.send('hello express')
})

// app.get('/users', (req, res) => {
//   res.send('hello users')
// })

app.listen(PORT, () => console.log('サーバー起動'))
