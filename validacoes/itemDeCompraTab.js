const Joi = require('joi');

const itemDeCompraTab = Joi.object({
    id_estoque: 
    Joi.number()
    .required(),
    
    id_compra: 
    Joi.number()
    .required(),

    quantidade: 
    Joi.number()
    .required(),
});

module.exports = itemDeCompraTab;
