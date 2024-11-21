const { getAll, create, getOne, remove, update } = require('../controllers/promotion.controllers');
const express = require('express');
const verifyJWT = require("../utils/verifyJWT")

const promotionRouter = express.Router();

promotionRouter.route('/')
    .get(verifyJWT(['superUser', 'admin', 'user']), getAll)
    .post(verifyJWT(['superUser', 'admin']), create);

promotionRouter.route('/:id')
    .get(verifyJWT(['superUser', 'admin', 'user']), getOne)
    .delete(verifyJWT(['superUser', 'admin']), remove)
    .patch(verifyJWT(['superUser', 'admin']), update);

module.exports = promotionRouter;