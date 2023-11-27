async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    const tipoProduto = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await tipoProduto.query('SELECT NOW()');
    console.log(res.rows[0]);
    tipoProduto.release();

    global.connection = pool;
    return pool.connect();
}

async function selectTypeProdutos() {
    const tipoProduto = await connect();
    const res = await tipoProduto.query('SELECT * FROM tipo_de_produto', []);
    return res.rows;
}

async function selectTypeProduto(id) {
    const tipoProduto = await connect();
    const res = await tipoProduto.query('SELECT * FROM tipo_de_produto WHERE ID=$1', [id]);
    return res.rows;
}
 
async function deleteTypeProduto(id) {
    const tipoProduto = await connect();
    return await tipoProduto.query('DELETE FROM tipo_de_produto where id=$1;', [id]);
}

async function insertTypeProduto(TypeProduto) {
    const tipoProduto = await connect();
    const sql = 'INSERT INTO tipo_de_produto(tipo_produto) VALUES ($1);';
    const values = [TypeProduto.tipo_produto];
    return await tipoProduto.query(sql, values);
}

async function updateTypeProduto(id, TypeProduto) {
    const tipoProduto = await connect();
    const sql = 'UPDATE tipo_de_produto SET tipo_produto=$1 WHERE id=$2';
    const values = [TypeProduto.tipo_produto, id];
    return await tipoProduto.query(sql, values);
}



module.exports = {selectTypeProduto,selectTypeProdutos, deleteTypeProduto, insertTypeProduto, updateTypeProduto};
