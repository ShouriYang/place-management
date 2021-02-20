module.exports = options => {
  const assert = require('http-assert')
  return async (req, res, next) => {
    const token = req.headers.token
    console.log(token)
    assert(token, 401, '请先登录')
    await next()
  }
}