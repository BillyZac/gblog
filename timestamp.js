module.exports = function (req, res, next) {
  req.body.creationTime = Date.now()
  next()
}
