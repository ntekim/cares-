const jwt = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};

const currentUser = async (req, res) => {
    const token = req.headers.authorization.split('')[1];
    if (token) 
      await jwt.verify(token, process.env.JWT_KEY)
      .then(
        (decodedToken) => {
          const userId = decodedToken._id;
          return res.send(userId);
        }
      ).catch(
        (err) => {
          res.status(500).send(err);
        }
      );

    return res.send('No token found');
    
}
module.exports = { jwtAuth, currentUser };