const { getOne, create, remove, update, credentials, getAll } = require('../controllers/commerce.controllers');
const express = require('express');
const verifyJWT = require("../utils/verifyJWT")

const commerceRouter = express.Router();

commerceRouter.route('/')
    .get(verifyJWT(['superUser', 'admin', 'user']), getAll)
    .post(verifyJWT(['superUser']), create)


commerceRouter.route('/credentials') // En esta ruta se ingresan las credenciales suministradas al cliente
    .post(credentials)

commerceRouter.route('/:id')
    .get(verifyJWT(['superUser', 'admin', 'user']), getOne)
    .delete(verifyJWT(['superUser', 'admin']), remove)
    .patch(verifyJWT(['superUser', 'admin']), update);

module.exports = commerceRouter;

