async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    const contact = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await contact.query('SELECT NOW()');
    console.log(res.rows[0]);
    contact.release();

    global.connection = pool;
    return pool.connect();
}

async function selectContatoss() {
    const produt = await connect();
    const res = await produt.query(`SELECT  
    contato.*,
    cliente.nome AS nome_cliente,
    endereco.cep AS cep,
    endereco.rua AS rua,
    endereco.bairro AS bairro,
    endereco.numero AS numero_endereco
  from contato
inner join cliente on cliente.id = contato.id_cliente
left join endereco on cliente.id = endereco.id_cliente;`, []);
    return res.rows;
}

async function selectContatos(id) {
    const contact = await connect();
    const res = await contact.query('SELECT * FROM contato WHERE ID=$1', [id]);
    return res.rows;
}
 
async function deleteContatos(id) {
    const contact = await connect();
    return await contact.query('DELETE FROM contato where id=$1;', [id]);
}

async function insertContatos(Contatos) {
    const contact = await connect();
    const sql = 'INSERT INTO contato(id_cliente,celular,telefone_contato,telefone_fixo,email) VALUES ($1,$2,$3,$4,$5);';
    const values = [Contatos.id_cliente,Contatos.celular,Contatos.telefone_contato,Contatos.telefone_fixo,Contatos.email];
    return await contact.query(sql, values);
}

async function updateContatos(id, Contatos) {
    const contact = await connect();
    const sql = 'UPDATE contato SET id_cliente=$1,celular=$2,telefone_contato=$3,telefone_fixo=$4,email=$5 WHERE id=$6';
    const values = [Contatos.id_cliente,Contatos.celular,Contatos.telefone_contato,Contatos.telefone_fixo,Contatos.email,id];
    return await contact.query(sql, values);
}


module.exports = {selectContatos,selectContatoss, deleteContatos, insertContatos, updateContatos};
