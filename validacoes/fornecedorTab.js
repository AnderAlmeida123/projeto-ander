const Joi = require('joi');

const fornecedorTab = Joi.object({
    nome: 
    Joi.string()
    .min(1)
    .max(250)
    .required()
});

module.exports = fornecedorTab;
