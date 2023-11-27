const produtodb = require("../bancoDeDados/dbProduto");
const produtoTab = require("../validacoes/produtoTab");
const { messages } = require('joi-translation-pt-br');


module.exports = function(app){

app.get('/produto', async (req, res) => { 
    const produto = await produtodb.selectProducts();
    res.json(produto);
})

app.get('/produto/:id', async (req, res) => { 
    const produto = await produtodb.selectProduct(req.params.id);
    if(produto.length === 0){
        res.status(404).send('produto não encontrado');
        return;
    }
    res.json(produto);
})

app.delete('/produto/:id', async (req, res) =>{
    console.log('foi deletado', req.body);
    await produtodb.deleteProduct(req.params.id);
    res.status(201).send('deletado com sucesso');
})

app.post('/produto', async (req, res) => {
    const { error } = produtoTab.validate(req.body, { messages});

    if( error ) {
        res.status(400).send(error.message);
        return;
    }
    
    await produtodb.insertProduct(req.body);
    res.status(201).send("produto cadastrado com sucesso!");
    console.log('produto cadastrado com sucesso', req.body);
})

app.patch('/produto/:id', async (req, res) => {      
    await produtodb.updateProduct(req.params.id, req.body);
    res.sendStatus(200);
});
}


