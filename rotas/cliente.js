const clienteDb = require("../bancoDeDados/dbCliente");
const clienteTab = require("../validacoes/clienteTab");
const { messages } = require('joi-translation-pt-br');


module.exports = function(app){

app.get('/cliente', async (req, res) => { 
    const cliente = await clienteDb.selectCustomers();
    res.json(cliente);
})

app.get('/cliente/:id', async (req, res) => { 
    const cliente = await clienteDb.selectCustomer(req.params.id);
    if(cliente.length === 0){
        res.status(404).send('Cliente não encontrado');
        return;
    }
    res.json(cliente);
})

app.delete('/cliente/:id', async (req, res) =>{
    console.log('foi deletado', req.body);
    await clienteDb.deleteCustomer(req.params.id);
    res.status(201).send('deletado com sucesso');
})

app.post('/cliente', async (req, res) => {
    const { error } = clienteTab.validate(req.body, { messages});

    if( error ) {
        res.status(400).send(error.message);
        return;
    }
    
    await clienteDb.insertCustomer(req.body);
    res.status(201).send("cadastro criado com sucesso!");
    console.log('cadastrado com sucesso', req.body);
})

app.patch('/cliente/:id', async (req, res) => {      
    await clienteDb.updateCustomer(req.params.id, req.body);
    res.status(200).send('atualizado com sucesso!');
    console.log('cadastro atualizado com sucesso!', req.body);});
}


