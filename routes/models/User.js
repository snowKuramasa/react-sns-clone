const mongoose = require('mongoose')

const UserSchema = new mongoode.Schema(
  {
    //ユーザ名
    username: {
      type: String,
      required: true,
      min: 3,
      max: 25,
      unique: true,
    },
    //メール
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    //パスワード
    password: {
      type: String,
      required: true,
      min: 6,
      max: 50,
    },
    //アイコン画像
    profilePicture: {
      type: String,
      default: '',
    },
    //背景
    coverPicture: {
      type: String,
      default: '',
    },
    //フォローしてくれている人
    followers: {
      type: Array,
      default: '',
    },
    //フォローしている人
    followings: {
      type: Array,
      default: '',
    },
    //管理者かどうか
    isAdmin: {
      type: Boolean,
      default: false,
    },
    //プロフィール概要
    desc: {
      type: String,
      max: 70,
    },
    //住んでいる場所
    city: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true }
)
