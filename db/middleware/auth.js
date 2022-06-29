const jwt = require('jsonwebtoken');
const Pharmacist = require("../../caresplus/models/pharmacist");

const jwtAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken._id;
    if ((req.body.userId && req.body.userId !== userId) || (req.params.id && req.params.id !== userId)) {
      return res.send('Invalid user ID');
    } else {
      await Pharmacist.findById(userId)
      .then((pharm) => {
        if (pharm.status == false){
          return res.status(400).send('Account was deactivated, please contact admin');
        }else {
          next();
        }
      }).catch(() => {
          res.status(400).send("Pharmacist with id doesn't exist");
      }) 
    }
  } catch {
    res.status(401).json({
      error: "Unauthorized to perform this action"
    });
  }
};

module.exports = { jwtAuth };
