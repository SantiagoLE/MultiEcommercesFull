const catchError = require('../utils/catchError');
const superUserModel = require('../models/SuperUser');
const jwt = require("jsonwebtoken")


const getAll = catchError(async (req, res) => {
    const results = await superUserModel.findAll({ order: [['createdAt', 'DESC']]});
    return res.json(results);
});

const create = catchError(async (req, res) => {
    const result = await superUserModel.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await superUserModel.findByPk(id);
    if (!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const {force = true} = req.body
    const remove = await superUserModel.destroy({ where: { id }, force });
    if (!remove) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await superUserModel.update(
        req.body,
        { where: { id }, returning: true }
    );
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});


const login = catchError(async (req, res) => {

    const { userName, password } = req.body
    const user = await superUserModel.findOne({ where: { userName } })

    if (!user) return res.sendStatus(401)
    if (user.password !== password) return res.sendStatus(401)

    const token = jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: "1d" })
    return res.json({ user, token })
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login
}