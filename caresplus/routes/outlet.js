const express = require('express');
const router = express.Router;
const outletController = require("../controllers/Outlet");
let { jwtAuth } = require('../../db/middleware/auth');

router.get('/all', jwtAuth, outletController.getAllOutlets);
router.post('/:id/update', jwtAuth, outletController.updateOutlet);
router.get('/:id', jwtAuth, outletController);
router.get('/:id/delete', jwtAuth, outletController);
