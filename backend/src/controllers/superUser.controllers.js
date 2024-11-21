const catchError = require('../utils/catchError');
const { superUser } = require('../models');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const getAll = catchError(async (req, res) => {
    const allSuperUsers = await superUser.findAll({ order: [['createdAt', 'DESC']] });
    return res.json(allSuperUsers);
});

const create = catchError(async (req, res) => {
    const createSuperUser = await superUser.create(req.body);
    return res.status(201).json(createSuperUser);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const oneSuperUser = await superUser.findByPk(id);
    if (!oneSuperUser) return res.sendStatus(404);
    return res.json(oneSuperUser);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const { force = true } = req.body
    const removeSuperUser = await superUser.destroy({ where: { id }, force });
    if (!removeSuperUser) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const updateSuperUser = await superUser.update(
        req.body,
        { where: { id }, returning: true }
    );
    if (updateSuperUser[0] === 0) return res.sendStatus(404);
    return res.json(updateSuperUser[1][0]);
});


const login = catchError(async (req, res) => {

    const { userName, password } = req.body

    const loginUser = await superUser.findOne({ where: { userName } })
    if (!loginUser) return res.sendStatus(401)

    const userPassword = await bcrypt.compare(password, loginUser.password)
    if (!userPassword) return res.sendStatus(401)

    const token = jwt.sign({ loginUser }, process.env.TOKEN_SECRET, { expiresIn: "1d" })
    return res.json({ loginUser, token })
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login
}