
const pesquisaDeCep = async(cep)=>{
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    const dados = await fetch(url);
    const localidade = await dados.json();
    return localidade;
}

module.exports = pesquisaDeCep;