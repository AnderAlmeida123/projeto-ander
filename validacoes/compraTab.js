const Joi = require('joi');

const compraTab = Joi.object({
    id_cliente: 
    Joi.string()
    .min(1)
    .required(),
    
    data: 
    Joi.string()
    .min(1),

    valor_total:
    Joi.number(),

});


module.exports = compraTab;

