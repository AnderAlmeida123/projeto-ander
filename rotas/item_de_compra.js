const itemCompraDb = require("../bancoDeDados/dbItemDeCompra");
const itemCompraTab = require("../validacoes/itemDeCompraTab");
const { messages } = require('joi-translation-pt-br');


module.exports = function(app){

app.get('/item_de_compra', async (req, res) => { 
    const item_de_compra = await itemCompraDb.selectPurchaseItems();
    res.json(item_de_compra);
})

app.get('/item_de_compra/:id', async (req, res) => { 
    const item_de_compra = await itemCompraDb.selectPurchaseItem(req.params.id);
    if(item_de_compra.length === 0){
        res.status(404).send('item não encontrado');
        return;
    }
    res.json(item_de_compra);
})

app.delete('/item_de_compra/:id', async (req, res) =>{
    console.log('foi deletado', req.body);
    await itemCompraDb.deletePurchaseItem(req.params.id);
    res.status(201).send('deletado com sucesso');
    
})

app.post('/item_de_compra', async (req, res) => {
    console.log(req.body)
    const { error } = itemCompraTab.validate(req.body, { messages});

    if( error ) {
        res.status(400).send(error.message);
        return;
    }
    
    await itemCompraDb.insertPurchaseItem(req.body);
    res.status(201).send("cadastro criado com sucesso!");
    console.log('cadastrado com sucesso', req.body);
})

app.patch('/item_de_compra/:id', async (req, res) => {      
    await itemCompraDb.updatePurchaseItem(req.params.id, req.body);
    res.status(200).send('atualizado com sucesso!');
    console.log('atualizado com sucesso!', req.body);});
}


