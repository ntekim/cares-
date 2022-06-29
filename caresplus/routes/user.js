const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User");
const { jwtAuth } = require("../../db/middleware/auth");

router.post('/:id/profile/update', jwtAuth, UserController.updateProfile);
router.get('/current/profile', jwtAuth, UserController.loggedInPharmacist);
router.get('/all', jwtAuth, UserController.getAllPharmacist);
router.post('/:id/deactivate', jwtAuth, UserController.deactivatePharmacist);




module.exports = router;