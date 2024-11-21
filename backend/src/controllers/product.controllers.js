const catchError = require('../utils/catchError');
const { product, presentation, productPresentation } = require('../models');


const getAll = catchError(async (req, res) => {
  const { commerceId } = req.query
  const allProducts = await product.findAll({
    where: { commerceId },
    include: [{
      model: presentation,
    }],
    order: [
      ['createdAt', 'DESC'],
      [presentation, 'createdAt', 'DESC']
    ]
  });
  return res.json(allProducts);
});

const create = catchError(async (req, res) => {

  const { name, image, productPresentations, commerceId } = req.body;

  const createProduct = await product.create({ name, image, commerceId });

  // Agregar presentaciones con promise.all
  // await Promise.all(productPresentations.map(({ presentationId, price, quantity, discount }) =>
  //   product.addPresentation(presentationId, {
  //     through: { price, quantity, discount, commerceId }
  //   })
  // ));

  // Agregar presentaciones con for of
  for (const { presentationId, price, quantity, discount } of productPresentations) {
    await createProduct.addPresentation(presentationId, {
      through: { price, quantity, discount, commerceId }
    });
  }

  const presentations = await createProduct.getPresentations();
  return res.status(201).json({ createProduct, presentations });
});


const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const oneProduct = await product.findOne({
    where: { id },
    include: [{
      model: presentation,
    }],
    order: [
      ['createdAt', 'DESC'],
      [presentation, 'createdAt', 'DESC']
    ]
  });

  if (!oneProduct) return res.sendStatus(404);
  return res.json(oneProduct);
});


const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const { force = true } = req.body
  const removeProduct = await product.destroy({ where: { id }, force });
  if (!removeProduct) return res.sendStatus(404);
  return res.sendStatus(204);
});



const update = catchError(async (req, res) => {
  const { id } = req.params;
  const { name, image, productPresentations, commerceId } = req.body;

  const oneProduct = await product.findOne({ where: { id }, include: [presentation] });
  if (!oneProduct) return res.sendStatus(404);
  await oneProduct.update({ name, image });

  const existingPresentationIds = oneProduct.presentations.map(p => p.id); // Array con los id de presentaciones del producto
  const newPresentationIds = productPresentations.map(p => p.presentationId); // Array con los id de presentaciones por body


  await oneProduct.removePresentations(existingPresentationIds.filter(id => !newPresentationIds.includes(id)), { force: true }); // Elimino las presentaciones que existian, pero no vienen por body... Adicional paso el force:true oara eliminar la relacion de la tabla productPresentations

  // Actualizar o agregar presentaciones con promise.all
  // await Promise.all(productPresentations.map(async ({ presentationId, price, quantity, discount }) => {
  //   await productPresentation.upsert(
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
    await productPresentation.upsert({  // Este metodo actualiza si ya existe o crea en caso que no exista
      productId: id,
      presentationId,
      price,
      quantity,
      discount,
      commerceId
    });
  }

  const updateProduct = await product.findByPk(id, { include: [presentation] });

  return res.status(200).json(updateProduct);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update
}


