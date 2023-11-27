async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    const produt = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await produt.query('SELECT NOW()');
    console.log(res.rows[0]);
    produt.release();

    global.connection = pool;
    return pool.connect();
}

async function selectProducts() {
    const produt = await connect();
    const res = await produt.query(`SELECT produto.nome,
    marca.nome AS marca,
    tipo_de_produto.tipo_produto AS nome_tipo_produto
    FROM produto
    INNER JOIN marca ON marca.id = produto.id_marca
    INNER JOIN tipo_de_produto ON tipo_de_produto.id = produto.id_tipo_produto`, []);
    return res.rows;
}


async function selectProducts() {
    const produt = await connect();
    const res = await produt.query('SELECT * FROM produto', []);
    return res.rows;
}

async function selectProduct(id) {
    const produt = await connect();
    const res = await produt.query('SELECT * FROM produto WHERE ID=$1', [id]);
    return res.rows;
}
 
async function deleteProduct(id) {
    const produt = await connect();
    return await produt.query('DELETE FROM produto where id=$1;', [id]);
}

async function insertProduct(Product) {
    const produt = await connect();
    const sql = 'INSERT INTO produto(nome,id_tipo_produto,id_marca) VALUES ($1,$2,$3);';
    const values = [Product.nome, Product.id_tipo_produto, Product.id_marca];
    return await produt.query(sql, values);
}

async function updateProduct(id, Product) {
    const produt = await connect();
    const sql = 'UPDATE produto SET nome=$1, id_tipo_produto=$2, id_marca=$3 WHERE id=$4';
    const values = [Product.nome, Product.id_tipo_produto, Product.id_marca, id];
    return await produt.query(sql, values);
}



module.exports = {selectProduct,selectProducts, deleteProduct, insertProduct, updateProduct};
