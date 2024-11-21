const catchError = require('../utils/catchError');
const { commerce, typeOfCommerce, generalSetting } = require('../models');



const getAll = catchError(async (req, res) => {
  const allCommerces = await commerce.findAll({
    include: [
      { model: typeOfCommerce },
      { model: generalSetting }
    ],
    order: [['createdAt', 'DESC']]
  })
  return res.json(allCommerces);
});


const create = catchError(async (req, res) => {
  const createCommerce = await commerce.create(req.body);
  await generalSetting.create({ commerceId: createCommerce.id })
  return res.status(201).json(createCommerce);
});


const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const oneCommerce = await commerce.findByPk(id, {
    include: [
      { model: typeOfCommerce },
      { model: generalSetting }
    ]
  });
  if (!oneCommerce) return res.sendStatus(404);
  return res.json(oneCommerce);
});


const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const { force = true } = req.body
  const removeCommerce = await commerce.destroy({ where: { id }, force });
  if (!removeCommerce) return res.sendStatus(404);
  return res.sendStatus(204);
});


const update = catchError(async (req, res) => {
  const { id } = req.params;
  const updateCommerce = await commerce.update(
    req.body,
    { where: { id }, returning: true }
  );
  if (updateCommerce[0] === 0) return res.sendStatus(404);
  return res.json(updateCommerce[1][0]);
});


const credentials = catchError(async (req, res) => {

  const { credentialName, credentialPassword } = req.body

  const oneCommerce = await commerce.findOne({ where: { credentialName } })

  if (!oneCommerce) return res.sendStatus(401)
  if (oneCommerce.status == "active") return res.sendStatus(403)
  if (oneCommerce.credentialPassword !== credentialPassword) return res.sendStatus(401)

  return res.status(200).json(oneCommerce)
})

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  credentials
}