const catchError = require('../utils/catchError');
const presentationsModel = require('../models/Presentations');


const getAll = catchError(async (req, res) => {
    const { commerceId } = req.query
    const results = await presentationsModel.findAll({ where: { commerceId }, order: [['createdAt', 'DESC']] });
    return res.json(results);
});


const create = catchError(async (req, res) => {
    const result = await presentationsModel.create(req.body);
    return res.status(201).json(result);
});


const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await presentationsModel.findOne({ where: { id } });
    if (!result) return res.sendStatus(404);
    return res.json(result);
});


const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const { force = true } = req.body
    const remove = await presentationsModel.destroy({ where: { id }, force });
    if (!remove) return res.sendStatus(404);
    return res.sendStatus(204);
})


const update = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await presentationsModel.update(
        req.body,
        { where: { id }, returning: true }
    );
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}