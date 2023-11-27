const Joi = require('joi');

const marcaTab = Joi.object({
    nome: 
    Joi.string()
    .min(1)
    .max(250)
    .required(),

    marca:
    Joi.string()
    .min(1)
    .max(250)
    .required()
});

module.exports = marcaTab;
