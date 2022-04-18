function requireUser(req, res, next) {
    if (!req.user) {
      res.status(401).send('User not authenticated')
    } else {
      next();
    }
  }
  
  module.exports = {
    requireUser,
  };