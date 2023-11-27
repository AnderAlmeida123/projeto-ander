async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    const fornece = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await fornece.query('SELECT NOW()');
    console.log(res.rows[0]);
    fornece.release();

    global.connection = pool;
    return pool.connect();
}

async function selectFornecimentos() {
    const fornece = await connect();
    const res = await fornece.query('SELECT * FROM fornecedor', []);
    return res.rows;
}

async function selectFornecimento(id) {
    const fornece = await connect();
    const res = await fornece.query('SELECT * FROM fornecedor WHERE ID=$1', [id]);
    return res.rows;
}
 
async function deleteFornecimento(id) {
    const fornece = await connect();
    return await fornece.query('DELETE FROM fornecedor where id=$1;', [id]);
}

async function insertFornecimento(Fornecimento) {
    const fornece = await connect();
    const sql = 'INSERT INTO fornecedor(nome) VALUES ($1);';
    const values = [ Fornecimento.nome];
    return await fornece.query(sql, values);
}

async function updateFornecimento(id, Fornecimento) {
    const fornece = await connect();
    const sql = 'UPDATE fornecedor SET  nome=$1 WHERE id=$2';
    const values = [ Fornecimento.nome, id];
    return await fornece.query(sql, values);
}



module.exports = {selectFornecimento,selectFornecimentos, deleteFornecimento, insertFornecimento, updateFornecimento};
