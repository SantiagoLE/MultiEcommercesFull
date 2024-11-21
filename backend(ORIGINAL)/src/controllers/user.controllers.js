const catchError = require('../utils/catchError');
const userModel = require('../models/User');
const GeneralSettings = require('../models/GeneralSettings');
const jwt = require("jsonwebtoken")


const getAll = catchError(async (req, res) => {
    const { commerceId } = req.query
    const users = await userModel.findAll({
        where: { commerceId },
        order: [['createdAt', 'DESC']]
    });
    return res.json(users);
});

const create = catchError(async (req, res) => {
    const user = await userModel.create(req.body);
    return res.status(201).json(user);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findByPk(id);
    if (!user) return res.sendStatus(404);
    return res.json(user);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const { commerceId, force = true } = req.body
    const remove = await userModel.destroy({ where: { id, commerceId }, force });
    if (!remove) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;
    const body = role === 'user' ? { profileImage: req.body.profileImage } : req.body;
    const result = await userModel.update(
        body,
        { where: { id }, returning: true }
    );
    
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});



const login = catchError(async (req, res) => {
    const { userName, password, commerceId } = req.body;

    const user = await userModel.findOne({ where: { userName, commerceId } });

    if (!user) return res.sendStatus(401);
    if (user.password !== password) return res.sendStatus(401);

    const generalSettings = await GeneralSettings.findOne({ where: { commerceId } });

    const { workStart, workEnd, workDays } = generalSettings;

    const token = jwt.sign({
        user,
        generalSettings: { workStart, workEnd, workDays }
    }, process.env.TOKEN_SECRET, { expiresIn: "1d" });

    return res.json({ user, token });
});


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login
}