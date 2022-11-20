const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');
const asyncHandler = require('express-async-handler');

const { secret, expiresIn } = jwtConfig;


// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const token = jwt.sign(
      { data: user.toSafeObject() },
      secret,
      { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
      maxAge: expiresIn * 1000, // maxAge in milliseconds
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction && "Lax"
    });

    return token;
};

// Restores user
const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      if (err) {
        return next();
      }

      try {
        const { id } = jwtPayload.data;
        req.user = await User.scope('currentUser').findByPk(id);
      } catch (e) {
        res.clearCookie('token');
        return next();
      }

      if (!req.user) res.clearCookie('token');

      return next();
    });
};

// Log in user
const verifyLoginUser = asyncHandler(async (req, res, next) => {
  console.log('LOGINGNGNGNGN')
  console.log(req.body)
  const {currentEmail, currentPassword} = req.body

  const user = await User.login({credential: currentEmail, password: currentPassword})

  if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
  }
  else {
    if(req.user.id === user.id) {
        console.log('passed')
        next()
    }
    else {
        return next(new Error('Login verify failed'))
    }
  }
})

// If there is no current user, return an error
const requireAuth = [
    restoreUser,
    function (req, _res, next) {
      if (req.user) return next();

      const err = new Error('Unauthorized');
      err.title = 'Unauthorized';
      err.errors = ['Unauthorized'];
      err.status = 401;
      return next(err);
    }
];


module.exports = { setTokenCookie, restoreUser, requireAuth, verifyLoginUser };
