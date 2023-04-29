const randToken = require('rand-token');
const refreshTokens = {};

const login = async function (req, res) {
  let body = req.body;
  let err;
  [err, user] = await to(authService.authUser(body));
  if (user) {
    delete user.dataValues.password;
    var refreshToken = randToken.uid(256);
    refreshTokens[refreshToken] = {
      user: user
    };
    [err, token] = await to(user.getJWT());
    if (err) return ReE(res, err, 422);
    return ReS(res, { token, refreshToken: refreshToken, user: user });
  }
  if (err) return ReE(res, err, 422);
}
module.exports.login = login;

/**
 * async function to The Refresh Token grant type is used by clients to exchange a
 * refresh token for an access token when the access token has expired.
 * If error occurs return the error response
 * otherwise return the success response and send a mail to the employee.
 */
const refreshToken = async function (req, res) {
  const refreshToken = req.body.refreshToken;
  if (refreshToken in refreshTokens) {
    [err, token] = await to(refreshTokens[refreshToken].user.getJWT());
    delete refreshTokens[refreshToken];
    return ReS(res, { accessToken: token });
  } else {
    return ReE(res, pe({ message: ERROR.invalid_token }), 422);
  }
}
module.exports.refreshToken = refreshToken;