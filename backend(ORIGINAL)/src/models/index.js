// En este archivo defino todas las relaciones entre modelos

const Commerce = require("./Commerce");
const GeneralSettings = require("./GeneralSettings");
const Presentation = require("./Presentations");
const Product = require("./Product");
const ProductPresentation = require("./ProductPresentation");
const Promotion = require("./Promotion");
const TypeOfCommerce = require("./TypeOfCommerce");
const User = require("./User");


Commerce.belongsTo(TypeOfCommerce) //typeOfComerceId en Commerce
TypeOfCommerce.hasMany(Commerce)

Product.belongsToMany(Presentation, {through : ProductPresentation}) // table pivot productPresentations
Presentation.belongsToMany(Product, {through : ProductPresentation})

Product.belongsTo(Commerce) //comerceId en Product
Commerce.hasMany(Product)

Presentation.belongsTo(Commerce) //comerceId en Presentation
Commerce.hasMany(Presentation)

Promotion.belongsTo(Commerce) //comerceId en Promotion
Commerce.hasMany(Promotion)

ProductPresentation.belongsTo(Commerce) //comerceId en ProductPresentations
Commerce.hasMany(ProductPresentation)

User.belongsTo(Commerce) //comerceId en ProductPresentations
Commerce.hasMany(User)

Product.belongsToMany(Promotion, {through: "productPromotions"}) // table pivot productPromotions
Promotion.belongsToMany(Product, {through: "productPromotions"})

GeneralSettings.belongsTo(Commerce) //comerceId en ProductPresentations
Commerce.hasOne(GeneralSettings)