const Joi = require('joi');

const contatoTab = Joi.object({
    id_cliente: 
    Joi.number()
    .required(),
    
    celular: 
    Joi.string()
    .min(8)
    .max(12)
    .required(),

    telefone_contato:
    Joi.string()
    .min(8)
    .max(12)
    .required(),

    telefone_fixo:
    Joi.string()
    .min(8)
    .max(12)
    .required(),

    email:
    Joi.string()
    .min(1)
    .max(250)
    .required()
   
});

module.exports = contatoTab;