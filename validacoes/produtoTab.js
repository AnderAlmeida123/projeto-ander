const Joi = require('joi');

const produtoTab = Joi.object({
    nome:
    Joi.string()
    .min(2)
    .max(250)
    .required(),

    id_tipo_produto: 
    Joi.number()
    .required(),

    id_marca: 
    Joi.number()
    .required()

});

module.exports = produtoTab;