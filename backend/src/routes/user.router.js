const { getAll, create, getOne, remove, update, login, verifyEmail, resetPassword, updatePassword } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT = require("../utils/verifyJWT")

const userRouter = express.Router();

userRouter.route('/')
    .get(verifyJWT(['superUser', 'admin']), getAll)
    .post(verifyJWT(['superUser', 'admin']), create);

userRouter.route('/login')
    .post(login)

userRouter.route("/reset_password")
    .post(resetPassword)

userRouter.route('/:id')
    .get(verifyJWT(['superUser', 'admin', 'user']), getOne)
    .delete(verifyJWT(['superUser', 'admin']), remove)
    .patch(verifyJWT(['superUser', 'admin', 'user']), update);

userRouter.route('/verify/:token')
    .get(verifyEmail)

userRouter.route("/reset_password/:token")
 .patch(updatePassword)


module.exports = userRouter;