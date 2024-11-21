const { create, getOne, remove, update } = require('../controllers/generalSettings.controllers');
const express = require('express');
const verifyJWT = require("../utils/verifyJWT")

const generalSettingsRouter = express.Router();

generalSettingsRouter.route('/')
    .post(verifyJWT(['superUser', 'admin']), create)
    .get(verifyJWT(['superUser', 'admin']), getOne)
    .delete(verifyJWT(['superUser', 'admin']), remove)
    .patch(verifyJWT(['superUser', 'admin']), update);

module.exports = generalSettingsRouter;