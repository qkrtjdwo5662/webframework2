const express = require('express');

const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send('success');
    } else {
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/:id/unfollow', isLoggedIn, async(req,res,next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.removeFollowing(parseInt(req.params.id, 10));
      res.send('success');
    } else {
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/change', isLoggedIn, async (req, res, next) => {

  const changeName = req.body.name;
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      User.update({
        nick:changeName,
      },{
        where:{id:req.user.id}, 
      });

      return res.send("success");
    }else{
      res.status(404).send('no user');
    }
  }
    catch(error){
      console.log(error);
      next(error);
    }
  });

   
module.exports = router;
