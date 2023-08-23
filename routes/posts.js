const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')

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

//特定の投稿を取得する
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    await post.updateOne({
      $set: req.body,
    })
    return res.status(200).json(post)
  } catch (err) {
    return res.status(404).json(err)
  }
})

//投稿を更新する
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.userId === req.body.userId) {
      await post.updateOne({
        $set: req.body,
      })
      return res.status(200).json('投稿編集に成功しました！')
    } else {
      return res.status(403).json('あなたは他の人の投稿を編集できません')
    }
  } catch (err) {
    return res.status(403).json(err)
  }
})

//投稿を削除する
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.userId === req.body.userId) {
      await post.deleteOne()
      return res.status(200).json('投稿削除に成功しました！')
    } else {
      return res.status(403).json('あなたは他の人の投稿を削除できません')
    }
  } catch (err) {
    return res.status(403).json(err)
  }
})

//特定の投稿にいいねをする
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    //いいねが押されていない場合にいいねをする
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        $push: {
          likes: req.body.userId,
        },
      })
      return res.status(200).json('いいねに成功しました！')
    } else {
      //いいねが押されている場合いいねしているユーザーIDを取り除く
      await post.updateOne({
        $pull: {
          likes: req.body.userId,
        },
      })
      return res.status(200).json('投稿のいいねを外しました')
    }
  } catch (err) {
    return res.status(500).json(err)
  }
})

//タイムラインの投稿を取得
//APIのURIを設定する際に「/{文字列}」とすると文字列にはパラメータが入ることになるので注意
//以下の場合、/timeline とした場合、上記に記載している特定の投稿取得APIと重複することになる
router.get('/timeline/all', async (req, res) => {
  try {
    const currrentUser = await User.findById(req.body.userId)

    //自分自身の投稿を取得
    const userPosts = await Post.find({ userId: currrentUser._id })

    //フォローしているユーザーの投稿を全て取得
    //Promise.allでcurrentUserの返却を待ってから処理を実行
    const friendPosts = await Promise.all(
      currrentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId })
      })
    )

    return res.status(200).json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
