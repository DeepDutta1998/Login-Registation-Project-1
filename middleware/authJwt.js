const jwt = require('jsonwebtoken')

class AuthJwt {
  async authJwt(req, res, next) {
    try {
      if (req.cookies && req.cookies.userToken) {
        jwt.verify(req.cookies.userToken, 'NJC3R4YJK', (err, data) => {
          req.user = data
          next()
        })
      } else {
        next()
      }
    } catch (err) {
      throw err
    }
  }
}

module.exports = new AuthJwt()
