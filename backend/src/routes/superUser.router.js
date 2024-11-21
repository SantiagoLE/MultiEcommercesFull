const { getAll, create, getOne, remove, update, login } = require('../controllers/superUser.controllers');
const express = require('express');
const verifyJWT = require("../utils/verifyJWT")


const superUserRouter = express.Router();

superUserRouter.route('/')
    .get(verifyJWT(['superUser']), getAll)
    .post( create);

superUserRouter.route('/login')
    .post(login)

superUserRouter.route('/:id')
    .get(verifyJWT(['superUser']), getOne)
    .delete(verifyJWT(['superUser']), remove)
    .patch(verifyJWT(['superUser']), update);

module.exports = superUserRouter;