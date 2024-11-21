const catchError = require('../utils/catchError');
const { productPresentation } = require('../models');


const update = catchError(async (req, res) => {  // Controlador usado solo cuando se realizan ventas y se debe restar la cantidad existente de un producto
    const { productId, presentationId, quantity } = req.body

    const updateProductPresentation = await productPresentation.findOne({ where: { productId, presentationId } })
    if (!updateProductPresentation) return res.sendStatus(404);

    if (quantity) {
        const quantityUpdate = updateProductPresentation.quantity - quantity;
        await updateProductPresentation.update({ quantity: quantityUpdate }, { returning: true })
    }

    return res.json(updateProductPresentation);

});


module.exports = {
    update
}