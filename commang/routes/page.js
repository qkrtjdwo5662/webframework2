const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User, Hashtag, Comment } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
  res.locals.likerIdList = req.user ? req.user.LikedPosts.map(f => f.id) : [];
  next();
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: 'Profile - prj-name' });
});

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: 'Join to - prj-name' });
});

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });

    const comments = await Comment.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.render('main', {
      title: 'commang',
      twits: posts,
      comments:comments,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});



router.get('/hashtag', async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }

    return res.render('main', {
      title: `${query} | NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/comment/:id", isLoggedIn, async (req, res, next) =>{

  console.log(req.body);

  try{
    const post = await Post.findOne({
      where : {id : req.params.id}
    });

    if (post){
      const comment = await Comment.create({
        comment: req.body.content,
        commenter: req.user.nick,
        postId : req.params.postId,
        UserId : req.body.userId

      });
    
      await post.addComment(comment);
    }
    res.redirect("/");
  } catch(error){
    console.error(error);
    next(error);
  }
});


module.exports = router;


