const { create, remove, update, getAll, getOne } = require('../controllers/typeOfCommerce.controllers');
const express = require('express');
const verifyJWT = require("../utils/verifyJWT")

const typeOfCommerceRouter = express.Router();

typeOfCommerceRouter.route('/')
    .get(verifyJWT(['superUser', 'admin']), getAll)
    .post(verifyJWT(['superUser']), create) 

typeOfCommerceRouter.route('/:id')
    .get(verifyJWT(['superUser', 'admin']), getOne)
    .delete(verifyJWT(['superUser']), remove) 
    .patch(verifyJWT(['superUser']), update) 

module.exports = typeOfCommerceRouter;