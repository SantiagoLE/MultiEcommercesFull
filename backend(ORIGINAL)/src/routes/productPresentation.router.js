const {update} = require('../controllers/productPresentations.controllers');
const express = require('express');
const verifyJWT = require("../utils/verifyJWT")

const productPresentationRouter = express.Router();

productPresentationRouter.route('/')
    .patch(verifyJWT(['superUser', 'admin', 'user']), update); // Ruta para cuando realizan ventas y se debe restar la cantidad existente de un producto


module.exports = productPresentationRouter;