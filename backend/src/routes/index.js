const express = require("express");
const typeOfCommerceRouter = require("./typeOfCommerce.router");
const commerceRouter = require("./commerce.router");
const productRouter = require("./product.router");
const presentationRouter = require("./presentation.router");
const promotionRouter = require("./promotion.router");
const productPresentationRouter = require("./productPresentation.router");
const superUserRouter = require("./superUser.router");
const userRouter = require("./user.router");
const generalSettingRouter = require("./generalSetting.router");
const router = express.Router();

// colocar las rutas aquí

router.use("/typeOfCommerces", typeOfCommerceRouter);
router.use("/commerces", commerceRouter);
router.use("/products", productRouter);
router.use("/presentations", presentationRouter);
router.use("/promotions", promotionRouter);
router.use("/productPresentations", productPresentationRouter);
router.use("/superUsers", superUserRouter)
router.use("/users", userRouter)
router.use("/generalSettings" , generalSettingRouter)


module.exports = router;
