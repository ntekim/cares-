const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User");
const { jwtAuth } = require("../../db/middleware/auth");

router.post('/profile', jwtAuth, UserController.updateProfile);
router.get('/current',  UserController.loggedInUser);



module.exports = router;