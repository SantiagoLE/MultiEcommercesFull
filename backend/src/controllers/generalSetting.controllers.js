const catchError = require('../utils/catchError');
const {generalSetting} = require('../models');


// VERIFICAR LA NECESIDAD DE CONTROLADOR DE CREACION    
const create = catchError(async (req, res) => {
    const createGeneralSetting = await generalSetting.create(req.body);
    return res.status(201).json(createGeneralSetting);
});

const getOne = catchError(async (req, res) => {
    const { commerceId } = req.query
    const oneGeneralSetting = await generalSetting.findOne({ where: { commerceId } });
    if (!oneGeneralSetting) return res.sendStatus(404);
    return res.json(oneGeneralSetting);
});

const remove = catchError(async (req, res) => {
    const {commerceId, force = true} = req.body
    const removeGeneralSetting = await generalSetting.destroy({ where: { commerceId }, force });
    if (!removeGeneralSetting) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
   const {commerceId, ...updateBody} = req.body

    const updateGeneralSetting = await generalSetting.update(
        updateBody,
        { where: { commerceId }, returning: true }
    );
    if (updateGeneralSetting[0] === 0) return res.sendStatus(404);
    return res.json(updateGeneralSetting[1][0]);
});


module.exports = {
    create,
    getOne,
    remove,
    update
}