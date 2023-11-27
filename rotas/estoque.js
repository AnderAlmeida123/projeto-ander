const estoqueDb = require("../bancoDeDados/dbEstoque");
const estoqueTab = require("../validacoes/estoqueTab");
const { messages } = require('joi-translation-pt-br');


module.exports = function(app){

app.get('/estoque', async (req, res) => { 
    const estoque = await estoqueDb.selectDoEstoques();
    res.json(estoque);
})

app.get('/estoque/:id', async (req, res) => { 
    const estoque = await estoqueDb.selectDoEstoque(req.params.id);
    if(estoque.length === 0){
        res.status(404).send('estoque não encontrado');
        return;
    }
    res.json(estoque);
})

app.delete('/estoque/:id', async (req, res) =>{
    console.log('produto foi deletado', req.body);
    await estoqueDb.deleteDoEstoque(req.params.id);
    res.status(201).send('deletado com sucesso');
})

app.post('/estoque', async (req, res) => {
    const { error } = estoqueTab.validate(req.body, { messages});
    
    if( error ) {
        res.status(400).send(error.message);
        return;
    }
    
    await estoqueDb.insertDoEstoque(req.body);
    res.status(201).send("cadastrado com sucesso!");
    console.log('cadastrado com sucesso', req.body);
    
})

app.patch('/estoque/:id', async (req, res) => {      
    await estoqueDb.updateDoEstoque(req.params.id, req.body);
    if(req.params.id === 0){
        res.status(404).send('estoque não encontrado');
        return;
    }
    res.status(200).send('atualizado com sucesso!');
    console.log('cadastro atualizado com sucesso!', req.body);
});
}



