const Joi = require('joi');

const enderecoTab = Joi.object({
    id_cliente: 
    Joi.number()
    .required(),
    
    cep: 
    Joi.string()
    .min(7)
    .max(9)
    .required(),

    rua:
    Joi.string()
    .min(1)
    .max(250)
    .required(),

    bairro:
    Joi.string()
    .min(1)
    .max(250)
    .required(),

    cidade:
    Joi.string()
    .min(1)
    .max(250)
    .required(),

    estado:
    Joi.string()
    .min(1)
    .max(250)
    .required(),

    numero:
    Joi.number()
    .required(),

    referencia:
    Joi.string()
    .min(1)
    .max(250)
    .required()

});

module.exports = enderecoTab;