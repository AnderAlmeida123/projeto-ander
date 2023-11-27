const compraDb = require("../bancoDeDados/dbCompra");
const compraTab = require("../validacoes/compraTab");
const { messages } = require('joi-translation-pt-br');


module.exports = function(app){

app.get('/compra', async (req, res) => { 
    const compra = await compraDb.selectPurchases();
    res.json(compra);
})

app.get('/compra/:id', async (req, res) => { 
    const compra = await compraDb.selectPurchase(req.params.id);
    if(compra.length === 0){
        res.status(404).send('compra não encontrado');
        return;
    }
    res.json(compra);
})

app.delete('/compra/:id', async (req, res) =>{
    console.log('foi deletado', req.body);
    await compraDb.deletePurchase(req.params.id);
    res.status(201).send('deletado com sucesso');
})

app.post('/compra', async (req, res) => {
    const { error } = compraTab.validate(req.body, { messages});

    if( error ) {
        res.status(400).send(error.message);
        return;
    }
    
    await compraDb.insertPurchase(req.body);
    res.status(201).send("cadastrada com sucesso!");
    console.log('cadastrada com sucesso', req.body);
})

app.patch('/compra/:id', async (req, res) => {      
     await compraDb.updatePurchase(req.params.id, req.body);
     res.status(200).send('atualizado com sucesso!');
     console.log('cadastro atualizado com sucesso!', req.body);
});
}



