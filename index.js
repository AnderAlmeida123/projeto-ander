const { messages } = require('joi-translation-pt-br');
const express = require('express'); 
var cors = require('cors');

require("dotenv").config();


//              BANCO DE DADOS
const clienteDb = require("./bancoDeDados/dbCliente");
const produtoDb = require("./bancoDeDados/dbProduto")
const tipoProdutoDb = require("./bancoDeDados/dbTipoProduto")
const estoqueDb = require("./bancoDeDados/dbEstoque");
const compraDb = require("./bancoDeDados/dbCompra");
const itemCompraDb = require('./bancoDeDados/dbItemDeCompra');
const fornecedorDb = require('./bancoDeDados/dbFornecedor');
const marcaDb = require('./bancoDeDados/dbMarca');
const enderecoDb = require('./bancoDeDados/dbEndereco');
const contatoDb = require('./bancoDeDados/dbContato');

//              VALIDAÇÕES
const clienteTab  = require('./validacoes/clienteTab');
const produtoTab = require('./validacoes/produtoTab');
const tipoProdutoTab = require('./validacoes/tipoDeProdutoTab');
const estoqueTab = require('./validacoes/estoqueTab');
const compraTab = require('./validacoes/compraTab');
const itemDeCompraTab = require('./validacoes/itemDeCompraTab');
const fornecedorTab = require('./validacoes/fornecedorTab');
const marcaTab = require('./validacoes/marcaTab');
const enderecoTab = require('./validacoes/enderecoTab');
const contatoTab = require('./validacoes/contatoTab');




const port = process.env.PORT || 3000;
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

//                ROTAS
require('./rotas/cliente')(app);
require('./rotas/tipo_de_produtos')(app);
require('./rotas/produto')(app);
require('./rotas/estoque')(app);
require('./rotas/compra')(app);
require('./rotas/item_de_compra')(app);
require('./rotas/fornecedor')(app);
require('./rotas/marca')(app);
require('./rotas/endereco')(app);
require('./rotas/contato')(app);





console.log(port)
//inicia o servidor
app.listen(port);
console.log('servidor logado na porta' +port);
