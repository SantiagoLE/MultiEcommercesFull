const catchError = require('../utils/catchError');
const productPresentationModel = require('../models/ProductPresentation');


const update = catchError(async (req, res) => {  // Controlador usado solo cuando se realizan ventas y se debe restar la cantidad existente de un producto
    const { productId, presentationId, quantity} = req.body

    const productPresentation = await productPresentationModel.findOne({ where: { productId, presentationId } })
    if (!productPresentation) return res.sendStatus(404);

    if (quantity) {
        const quantityUpdate = productPresentation.quantity - quantity;
        await productPresentation.update({quantity:quantityUpdate}, { returning: true })
    }

    return res.json(productPresentation);

});


module.exports = {
    update
}