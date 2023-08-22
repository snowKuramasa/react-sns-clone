const router = require('express').Router()
const Post = require('../models/Post')

//server.jsのURIをルートとしている
//投稿を作成する
router.post('/', async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const savedPost = await newPost.save()
    return res.status(201).json(savedPost)
  } catch (err) {
    return res.status(500).json(err)
  }
})

module.exports = router
