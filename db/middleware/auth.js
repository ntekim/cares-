const jwt = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken._id;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      if (decodedToken.status == 0){
        throw 'Account was deactivated, contact admin';
      }else {
        next();
      }
    }
  } catch {
    res.status(401).json({
      error: "Unauthorized to perform this action"
    });
  }
};


module.exports = { jwtAuth };