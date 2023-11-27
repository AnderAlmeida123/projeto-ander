const Joi = require('joi');

const tipoDeProdutoTab = Joi.object({
    tipo_produto: 
    Joi.string()
    .min(1)
    .max(250)
    .required()
});

module.exports = tipoDeProdutoTab;