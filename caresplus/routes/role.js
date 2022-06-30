const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/Role');
const {jwtAuth } = require('../../db/middleware/auth');

router.get('/all', jwtAuth, RoleController.getAllRoles);