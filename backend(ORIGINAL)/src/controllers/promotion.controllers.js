const catchError = require('../utils/catchError');
const promotionModel = require('../models/Promotion');
const Product = require('../models/Product');
const Presentation = require('../models/Presentations');



const getAll = catchError(async (req, res) => {
    const { commerceId } = req.query
    const results = await promotionModel.findAll({
        where: { commerceId },
        include: [{
            model: Product,
            order: [['createdAt', 'DESC']],
            include: [{
                model: Presentation,
                order: [['createdAt', 'DESC']]
            }]
        }],
        order: [['createdAt', 'DESC']]
    });

    return res.json(results);
});


const create = catchError(async (req, res) => {

    const { name, price, image, limitOfProducts, fixedAssociation, productIds, commerceId } = req.body

    const promotion = await promotionModel.create({ name, price, image, limitOfProducts, fixedAssociation, commerceId });
    await promotion.setProducts(productIds);
    const results = await promotion.getProducts()

    return res.status(201).json({ promotion, results });
});


const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await promotionModel.findOne({
        where: { id },
        include: [{
            model: Product,
            include: [{
                model: Presentation
            }]
        }]
    });
    if (!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const { force = true } = req.body
    const remove = await promotionModel.destroy({ where: { id }, force });
    if (!remove) return res.sendStatus(404);
    return res.sendStatus(204);
});


const update = catchError(async (req, res) => {
    const { id } = req.params;
    const promotion = await promotionModel.update(
        req.body,
        { where: { id }, returning: true }
    );
    if (promotion[0] === 0) return res.sendStatus(404);
   
    const promotionUpdate = await promotionModel.findOne({ where: { id} })
    await promotionUpdate.setProducts(req.body.productIds)

    const result = await promotionModel.findOne({
        where: { id },
        include: [{
            model: Product,
            order: [['createdAt', 'DESC']],
            include: [{
                model: Presentation,
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