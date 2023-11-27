const fornecedorDb = require("../bancoDeDados/dbFornecedor");
const fornecedorTab = require("../validacoes/fornecedorTab");
const { messages } = require('joi-translation-pt-br');


module.exports = function(app){

app.get('/fornecedor', async (req, res) => { 
    const fornecedor = await fornecedorDb.selectFornecimentos();
    res.json(fornecedor);
})

app.get('/fornecedor/:id', async (req, res) => { 
    const fornecedor = await fornecedorDb.selectFornecimento(req.params.id);
    if(fornecedor.length === 0){
        res.status(404).send('item não encontrado');
        return;
    }
    res.json(fornecedor);
})

app.delete('/fornecedor/:id', async (req, res) =>{
    console.log('foi deletado', req.body);
    await fornecedorDb.deleteFornecimento(req.params.id);
    res.status(201).send('deletado com sucesso');
    
})

app.post('/fornecedor', async (req, res) => {
    const { error } = fornecedorTab.validate(req.body, { messages});

    if( error ) {
        res.status(400).send(error.message);
        return;
    }
    
    await fornecedorDb.insertFornecimento(req.body);
    res.status(201).send("cadastro criado com sucesso!");
    console.log('cadastrado com sucesso', req.body);
})

app.patch('/fornecedor/:id', async (req, res) => {      
    await fornecedorDb.updateFornecimento(req.params.id, req.body);
    res.status(200).send('atualizado com sucesso!');
    console.log('atualizado com sucesso!', req.body);});
}



