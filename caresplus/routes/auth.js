const express = require('express');
const router = express.Router();
const Authcontroller = require('../controllers/auth');
const { body } = require("express-validator");
const {jwtAuth } = require('../../db/middleware/auth');


router.post('/signup', body('email').isEmail().normalizeEmail(),
    body('password').isLength({
        min: 6
    }), Authcontroller.signup
);

router.post('/login', body('email').isEmail().normalizeEmail(),
body('password').isLength({
    min: 6
}),  Authcontroller.login);

router.post('/logout', jwtAuth, Authcontroller.logout);


module.exports = router;