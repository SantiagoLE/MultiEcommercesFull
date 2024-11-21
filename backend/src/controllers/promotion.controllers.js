const catchError = require('../utils/catchError');
const { promotion, presentation, product } = require('../models');




const getAll = catchError(async (req, res) => {
    const { commerceId } = req.query
    const allPromotions = await promotion.findAll({
        where: { commerceId },
        include: [{
            model: product,
            include: [{
                model: presentation
            }]
        }],
        order: [
            ['createdAt', 'DESC'],
            [product, 'createdAt', 'DESC'],
            [product, presentation, 'createdAt', 'DESC']
        ]
    });

    return res.json(allPromotions);
});


const create = catchError(async (req, res) => {

    const { name, price, image, limitOfProducts, fixedAssociation, productIds, commerceId } = req.body

    const createPromotion = await promotion.create({ name, price, image, limitOfProducts, fixedAssociation, commerceId });
    await createPromotion.setProducts(productIds);
    const products = await createPromotion.getProducts()

    return res.status(201).json({ createPromotion, products });
});


const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const onePromotion = await promotion.findOne({
        where: { id },
        include: [{
            model: product,
            include: [{
                model: presentation
            }]
        }],
        order: [
            ['createdAt', 'DESC'],
            [product, 'createdAt', 'DESC'],
            [product, presentation, 'createdAt', 'DESC']
        ]
    });
    if (!onePromotion) return res.sendStatus(404);
    return res.json(onePromotion);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const { force = true } = req.body
    const removePromotion = await promotion.destroy({ where: { id }, force });
    if (!removePromotion) return res.sendStatus(404);
    return res.sendStatus(204);
});


const update = catchError(async (req, res) => {
    const { id } = req.params;
    const updatePromotion = await promotion.update(
        req.body,
        { where: { id }, returning: true }
    );
    if (updatePromotion[0] === 0) return res.sendStatus(404);

    const onePromotion = await promotion.findByPk(id)
    await onePromotion.setProducts(req.body.productIds)

    const result = await promotion.findByPk(id, {
        include: [{
            model: product,
            order: [['createdAt', 'DESC']],
            include: [{
                model: presentation,
                order: [['createdAt', 'DESC']]
            }]
        }]
    })


    return res.json(result);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}