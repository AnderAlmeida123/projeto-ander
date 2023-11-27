const Joi = require('joi');

const clienteTab = Joi.object({
    nome: 
    Joi.string()
    .min(4)
    .max(250)
    .required(),
    
    cpf: 
    Joi.string()
    .min(11)
    .max(11)
    .required()
});

module.exports = clienteTab;