const catchError = require('../utils/catchError');
const commerceModel = require('../models/Commerce');
const TypeOfCommerce = require('../models/TypeOfCommerce');
const GeneralSettings = require('../models/GeneralSettings');


const getAll = catchError(async (req, res) => {

  const results = await commerceModel.findAll({
    include: [{ model: TypeOfCommerce }],
    order: [['createdAt', 'DESC']]
  })
  return res.json(results);
});


const create = catchError(async (req, res) => {
  const commerce = await commerceModel.create(req.body);
  await GeneralSettings.create({ commerceId: commerce.id })
  return res.status(201).json(commerce);
});


const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await commerceModel.findByPk(id, { include: [TypeOfCommerce] });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});


const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const { force = true } = req.body
  const remove = await commerceModel.destroy({ where: { id }, force });
  if (!remove) return res.sendStatus(404);
  return res.sendStatus(204);
});


const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await commerceModel.update(
    req.body,
    { where: { id }, returning: true }
  );
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});


const credentials = catchError(async (req, res) => {

  const { credentialName, credentialPassword } = req.body

  const commerce = await commerceModel.findOne({ where: { credentialName } })

  if (!commerce) return res.sendStatus(401)
  if (commerce.status == "active") return res.sendStatus(403)
  if (commerce.credentialPassword !== credentialPassword) return res.sendStatus(401)

  return res.status(200).json(commerce)
})

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  credentials
}