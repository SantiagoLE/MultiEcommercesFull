const { getAll, create, getOne, remove, update } = require('../controllers/product.controllers');
const express = require('express');
const verifyJWT = require("../utils/verifyJWT")

const productRouter = express.Router();

productRouter.route('/')
    .get(verifyJWT(['superUser', 'admin', 'user']), getAll)
    .post(verifyJWT(['superUser', 'admin']), create);

productRouter.route('/:id')
    .get(verifyJWT(['superUser', 'admin', 'user']), getOne)
    .delete(verifyJWT(['superUser', 'admin']), remove)
    .patch(verifyJWT(['superUser', 'admin']), update);

module.exports = productRouter;