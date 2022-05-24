const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, User,Hashtag, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();



router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    console.log(req.user);
    const post = await Post.create({
      comment: req.body.content,
      commenter: req.user.id,
      PostId:req.Post.id,
      UserId:req.user.id,
    });
    
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;

