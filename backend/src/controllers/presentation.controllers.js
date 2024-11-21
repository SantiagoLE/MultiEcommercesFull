const catchError = require('../utils/catchError');
const {presentation} = require('../models');


const getAll = catchError(async (req, res) => {
    const { commerceId } = req.query
    const allPresentations = await presentation.findAll({ where: { commerceId }, order: [['createdAt', 'DESC']] });
    return res.json(allPresentations);
});


const create = catchError(async (req, res) => {
    const createPresentation = await presentation.create(req.body);
    return res.status(201).json(createPresentation);
});


const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const onePresentation = await presentation.findOne({ where: { id } });
    if (!onePresentation) return res.sendStatus(404);
    return res.json(onePresentation);
});


const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const { force = true } = req.body
    const removePresentation = await presentation.destroy({ where: { id }, force });
    if (!removePresentation) return res.sendStatus(404);
    return res.sendStatus(204);
})


const update = catchError(async (req, res) => {
    const { id } = req.params;
    const updatePresentation = await presentation.update(
        req.body,
        { where: { id }, returning: true }
    );
    if (updatePresentation[0] === 0) return res.sendStatus(404);
    return res.json(updatePresentation[1][0]);
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}