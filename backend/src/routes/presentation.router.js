const { getAll, create, getOne, remove, update } = require('../controllers/presentation.controllers');
const express = require('express');
const verifyJWT = require("../utils/verifyJWT")

const presentationRouter = express.Router();

presentationRouter.route('/')
    .get(verifyJWT(['superUser', 'admin', 'user']), getAll)
    .post(verifyJWT(['superUser', 'admin']), create);

presentationRouter.route('/:id')
    .get(verifyJWT(['superUser', 'admin', 'user']), getOne)
    .delete(verifyJWT(['superUser', 'admin']), remove)
    .patch(verifyJWT(['superUser', 'admin']), update);

module.exports = presentationRouter;