async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    const stock = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await stock.query('SELECT NOW()');
    console.log(res.rows[0]);
    stock.release();

    global.connection = pool;
    return pool.connect();
}

async function selectDoEstoques() {
    const stock = await connect();
    const res = await stock.query(`SELECT estoque.*,
    (valor_saida-valor_entrada) * quantidade AS lucro_previsto, 
    produto.nome AS nome_produto,       
    fornecedor.nome AS nome_fornecedor 
     FROM estoque 
     INNER JOIN produto ON produto.id = estoque.id_produto
     INNER JOIN fornecedor ON fornecedor.id = estoque.id_fornecedor`, []);
    return res.rows;
}


async function selectDoEstoque(id) {
    const stock = await connect();
    const res = await stock.query('SELECT * FROM estoque WHERE ID=$1', [id]);
    return res.rows;
}
 
async function deleteDoEstoque(id) {
    const stock = await connect();
    return await stock.query('DELETE FROM estoque where id=$1;', [id]);
}

async function insertDoEstoque(DoEstoque) {
    const stock = await connect();
    const sql = 'INSERT INTO estoque (id_produto,quantidade,valor_entrada,valor_saida, id_fornecedor) VALUES ($1,$2,$3,$4,$5);';
    const values = [DoEstoque.id_produto, DoEstoque.quantidade,DoEstoque.valor_entrada,DoEstoque.valor_saida,DoEstoque.id_fornecedor];
    return await stock.query(sql, values);
}

async function updateDoEstoque(id, DoEstoque) {
    const stock = await connect();
    const sql = 'UPDATE estoque SET id_produto=$1, quantidade=$2,valor_entrada=$3, valor_saida=$4, id_fornecedor=$5 WHERE id=$6';
    const values = [DoEstoque.id_produto, DoEstoque.quantidade,DoEstoque.valor_entrada,DoEstoque.valor_saida,DoEstoque.id_fornecedor, id];
    return await stock.query(sql, values);
}



module.exports = {selectDoEstoque,selectDoEstoques, deleteDoEstoque, insertDoEstoque, updateDoEstoque};
