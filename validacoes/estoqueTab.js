const Joi = require('joi');

const estoqueTab = Joi.object({
    id_produto: 
    Joi.string()
    .required(),
    
    quantidade: 
    Joi.string()
    .min(1)
    .required(),

    valor_entrada:
    Joi.number()
    .min(1)
    .required(),

    valor_saida:
    Joi.number()
    .min(1)
    .required(),
    
    id_fornecedor:
    Joi.number()
    .required()
});


module.exports = estoqueTab;

//falta editar essa parte de max