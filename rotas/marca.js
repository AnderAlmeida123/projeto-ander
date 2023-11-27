const marcaDb = require("../bancoDeDados/dbMarca");
const marcaTab = require("../validacoes/marcaTab");
const { messages } = require('joi-translation-pt-br');


module.exports = function(app){

app.get('/marca', async (req, res) => { 
    const marca = await marcaDb.selectMarcaNovas();
    res.json(marca);
})

app.get('/marca/:id', async (req, res) => { 
    const marca = await marcaDb.selectMarcaNova(req.params.id);
    if(marca.length === 0){
        res.status(404).send('marca não encontrado');
        return;
    }
    res.json(marca);
})

app.delete('/marca/:id', async (req, res) =>{
    console.log('foi deletado', req.body);
    await marcaDb.deleteMarcaNova(req.params.id);
    res.status(201).send('deletado com sucesso');
})

app.post('/marca', async (req, res) => {
    const { error } = marcaTab.validate(req.body, { messages});

    if( error ) {
        res.status(400).send(error.message);
        return;
    }
    
    await marcaDb.insertMarcaNova(req.body);
    res.status(201).send("cadastro criado com sucesso!");
    console.log('cadastrado com sucesso', req.body);
})

app.patch('/marca/:id', async (req, res) => {      
    await marcaDb.updateMarcaNova(req.params.id, req.body);
    res.status(200).send('atualizado com sucesso!');
    console.log('cadastro atualizado com sucesso!', req.body);});
}


