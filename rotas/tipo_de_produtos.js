const tipoProdutoDb = require("../bancoDeDados/dbTipoProduto");
const tipoDeProdutoTab = require("../validacoes/tipoDeProdutoTab")
const { messages } = require('joi-translation-pt-br');


module.exports = function(app){

app.get('/tipo_de_produto', async (req, res) => { 
    const tipoProduto = await tipoProdutoDb.selectTypeProdutos();
    res.json(tipoProduto);
})

app.get('/tipo_de_produto/:id', async (req, res) => { 
    const tipoProduto = await tipoProdutoDb.selectTypeProduto(req.params.id);
    if(tipoProduto.length === 0){
        res.status(404).send('produto não encontrado');
        return;
    }
    res.json(tipoProduto);
})

app.delete('/tipo_de_produto/:id', async (req, res) =>{
    // const tipoProduto = await tipoProdutoDb.selectTypeProduto(req.params.id)
    await tipoProdutoDb.deleteTypeProduto(req.params.id);
    res.status(201).send('deletado com sucesso');
    console.log('deletado com sucesso');

})

app.post('/tipo_de_produto', async (req, res) => {
    const { error } = tipoDeProdutoTab.validate(req.body, { messages});  
    
    if( error ) {
        res.status(400).send(error.message);
        return;
    }
    
    await tipoProdutoDb.insertTypeProduto(req.body);
    res.status(201).send("produto cadastrado com sucesso!");
    console.log('cadastrado com sucesso', req.body);
})

app.patch('/tipo_de_produto/:id', async (req, res) => {      
    await tipoProdutoDb.updateTypeProduto(req.params.id, req.body);
    res.sendStatus(200);
});
}


