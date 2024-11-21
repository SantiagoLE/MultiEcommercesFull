const catchError = require('../utils/catchError');
const productModel = require('../models/Product');
const Presentation = require('../models/Presentations');
const ProductPresentationModel = require('../models/ProductPresentation');

const getAll = catchError(async (req, res) => {
  const { commerceId } = req.query
  const results = await productModel.findAll({
    where: { commerceId },
    include: [{
      model: Presentation,
      order: [['createdAt', 'DESC']]
    }],
    order: [['createdAt', 'DESC']]
  });
  return res.json(results);
});


const create = catchError(async (req, res) => {
  const { name, image, productPresentations, commerceId } = req.body;

  const product = await productModel.create({ name, image, commerceId });

  // Agregar presentaciones con promise.all
  // await Promise.all(productPresentations.map(({ presentationId, price, quantity, discount }) =>
  //   product.addPresentation(presentationId, {
  //     through: { price, quantity, discount, commerceId }
  //   })
  // ));

  // Agregar presentaciones con for of
  for (const { presentationId, price, quantity, discount } of productPresentations) {
    await product.addPresentation(presentationId, {
      through: { price, quantity, discount, commerceId }
    });
  }

  const presentations = await product.getPresentations();
  return res.status(201).json({ product, presentations });
});


const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await productModel.findOne({ where: { id}, include: [Presentation] });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});


const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const { force = true } = req.body
  const remove = await productModel.destroy({ where: { id }, force });
  if (!remove) return res.sendStatus(404);
  return res.sendStatus(204);
});



const update = catchError(async (req, res) => {
  const { id } = req.params;
  const { name, image, productPresentations, commerceId } = req.body;

  const product = await productModel.findOne({ where: { id }, include: [Presentation] });
  if (!product) return res.sendStatus(404);

  await product.update({ name, image });

  const existingPresentationIds = product.presentations.map(p => p.id); // Array con los id de presentaciones del producto
  const newPresentationIds = productPresentations.map(p => p.presentationId); // Array con los id de presentaciones por body


  await product.removePresentations(existingPresentationIds.filter(id => !newPresentationIds.includes(id)), { force: true }); // Elimino las presentaciones que existian, pero no vienen por body... Adicional paso el force:true para que elimine la relacion de la tabla productPresentations

  // Actualizar o agregar presentaciones con promise.all
  // await Promise.all(productPresentations.map(async ({ presentationId, price, quantity, discount }) => {
  //   await ProductPresentationModel.upsert(
  //     {
  //       productId: id,
  //       presentationId,
  //       price,
  //       quantity,
  //       discount,
  //       commerceId
  //     }
  //   );
  // }));

  // Actualizar o agregar presentaciones con for of
  for (const { presentationId, price, quantity, discount } of productPresentations) {
    await ProductPresentationModel.upsert({
      productId: id,
      presentationId,
      price,
      quantity,
      discount,
      commerceId
    });
  }

const result = await productModel.findByPk(id, { include: [Presentation] });

  return res.status(200).json(result);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update
}


