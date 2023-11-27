const enderecoDb = require("../bancoDeDados/dbEndereco");
const enderecoTab = require("../validacoes/enderecoTab");
const enderecamento = require("../dadosExportados/enderecamento")
const { messages } = require('joi-translation-pt-br');


module.exports = function(app){

app.get('/endereco', async (req, res) => { 
    const endereco = await enderecoDb.selectAddresss();
    res.json(endereco);
})

app.get('/endereco/cep/:cep', async(req, res)=>{
    res.json(await enderecamento(req.params.cep))
})

app.get('/endereco/:id', async (req, res) => { 
    const endereco = await enderecoDb.selectAddress(req.params.id);
    if(endereco.length === 0){
        res.status(404).send('endereco não encontrado');
        return;
    }
    res.json(endereco);
})

app.delete('/endereco/:id', async (req, res) =>{
    console.log('foi deletado', req.body);
    await enderecoDb.deleteAddress(req.params.id);
    res.status(201).send('deletado com sucesso');
})

app.post('/endereco', async (req, res) => {
    const dados = await enderecamento(req.body.cep);
    const novoCadastro = {
        id_cliente:     req.body.id_cliente,
        cep:            dados.cep,
        rua:            dados.logradouro,
        bairro:         dados.bairro,
        cidade:         dados.localidade,
        estado:         dados.uf,
        numero:         req.body.numero,
        referencia:     req.body.referencia
    }
   const { error } = enderecoTab.validate(novoCadastro, { messages});
   
    if( error ) {
        res.status(400).send(error.message);
        return;
    }
    await enderecoDb.insertAddress(novoCadastro);

  
    res.status(201).send("cadastro criado com sucesso!");
    console.log('cadastrado com sucesso', novoCadastro);
})

app.patch('/endereco/:id', async (req, res) => {    
    const dados = await enderecamento(req.body.cep);
    const novoCadastro = {
        id_cliente:     req.body.id_cliente,
        cep:            dados.cep,
        rua:            dados.logradouro,
        bairro:         dados.bairro,
        cidade:         dados.localidade,
        estado:         dados.uf,
        numero:         req.body.numero,
        referencia:     req.body.referencia
    }  
    await enderecoDb.updateAddress(req.params.id, novoCadastro);
    res.status(200).send('atualizado com sucesso!');
    console.log('cadastro atualizado com sucesso!', novoCadastro);});


}
