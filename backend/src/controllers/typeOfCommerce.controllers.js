const catchError = require('../utils/catchError');
const {typeOfCommerce} = require('../models');


const getAll = catchError(async (req, res) => {

  const allTypeOfCommerces = await typeOfCommerce.findAll({order: [['createdAt', 'DESC']]});
  return res.json(allTypeOfCommerces);
});


const create = catchError(async (req, res) => {
  const createTypeOfCommerce = await typeOfCommerce.create(req.body);
  return res.status(201).json(createTypeOfCommerce);
});


const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const oneTypeOfCommerce = await typeOfCommerce.findByPk(id);
  if (!oneTypeOfCommerce) return res.sendStatus(404);
  return res.json(oneTypeOfCommerce);
});


const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const {force = true} = req.body
  const removeTypeOfCommerce = await typeOfCommerce.destroy({ where: { id }, force });
  if (!removeTypeOfCommerce) return res.sendStatus(404);
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const updateTypeOfCommerce = await typeOfCommerce.update(
    req.body,
    { where: { id }, returning: true }
  );
  if (updateTypeOfCommerce[0] === 0) return res.sendStatus(404);
  return res.json(updateTypeOfCommerce[1][0]);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update
}