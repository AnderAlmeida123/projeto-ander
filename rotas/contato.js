const contatodb = require("../bancoDeDados/dbContato");
const contatoTab = require("../validacoes/contatoTab")
const { messages } = require('joi-translation-pt-br');


module.exports = function(app){

app.get('/contato', async (req, res) => { 
    const tipoProduto = await contatodb.selectContatoss();
    res.json(tipoProduto);
})

app.get('/contato/:id', async (req, res) => { 
    const tipoProduto = await contatodb.selectContatos(req.params.id);
    if(tipoProduto.length === 0){
        res.status(404).send('produto não encontrado');
        return;
    }
    res.json(tipoProduto);
})

app.delete('/contato/:id', async (req, res) =>{
    // const tipoProduto = await contatodb.selectContatos(req.params.id)
    await contatodb.deleteContatos(req.params.id);
    res.status(201).send('deletado com sucesso');
    console.log('deletado com sucesso');

})

app.post('/contato', async (req, res) => {
    const { error } = contatoTab.validate(req.body, { messages});  
    
    if( error ) {
        res.status(400).send(error.message);
        return;
    }
    
    await contatodb.insertContatos(req.body);
    res.status(201).send("contato cadastrado com sucesso!");
    console.log('cadastrado com sucesso', req.body);
})

app.patch('/contato/:id', async (req, res) => {      
    await contatodb.updateContatos(req.params.id, req.body);
    res.status(200).send('Contato atualizado');
});
}


