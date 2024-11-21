const catchError = require('../utils/catchError');
const generalSettingsModel = require('../models/GeneralSettings');


const create = catchError(async (req, res) => {
    const result = await generalSettingsModel.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
    const { commerceId } = req.query
    const result = await generalSettingsModel.findOne({ where: { commerceId } });
    if (!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const {commerceId, force = true} = req.body
    const remove = await generalSettingsModel.destroy({ where: { commerceId }, force });
    if (!remove) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {

    const { logo, mainServicePointName, mainServicePointPicture, standarServicePointName, standarServicePointPicture, quantityStandarServicePoint, workDays, workStart, workEnd, commerceId } = req.body

    const updateBody = { logo, mainServicePointName, mainServicePointPicture, standarServicePointName, standarServicePointPicture, quantityStandarServicePoint, workDays, workStart, workEnd }
  
    const result = await generalSettingsModel.update(
        updateBody,
        { where: { commerceId }, returning: true }
    );
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    create,
    getOne,
    remove,
    update
}