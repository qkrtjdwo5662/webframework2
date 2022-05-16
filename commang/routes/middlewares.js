exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {//현재 세션 로그인 상태인지 확인
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {//현재 세션이 로그아웃 상태인지 확인
    next();//로그아웃이 아니라면
  } else { //로그아웃 상황이라면
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};
