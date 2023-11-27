async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();

    global.connection = pool;
    return pool.connect();
}


async function selectCustomer() {
    const client = await connect();
    const res = await client.query(`SELECT cliente.* 
    produto.nome AS nome_produto,
    fornecedor.nome AS nome_fornecedor 
     FROM cliente 
     INNER JOIN produto ON produto.id = cliente.id_produto
     INNER JOIN fornecedor ON fornecedor.id = cliente.id_fornecedor`, []);
    return res.rows;
}

async function selectCustomers() {
    const client = await connect();
    const res = await client.query('SELECT * FROM cliente', []);
    return res.rows;
}

async function selectCustomer(id) {
    const client = await connect();
    const res = await client.query('SELECT * FROM cliente WHERE ID=$1', [id]);
    return res.rows;
}
 
async function deleteCustomer(id) {
    const client = await connect();
    return await client.query('DELETE FROM cliente where id=$1;', [id]);
}

async function insertCustomer(customer) {
    const client = await connect();
    const sql = 'INSERT INTO cliente(nome, cpf) VALUES ($1,$2);';
    const values = [customer.nome, customer.cpf];
    return await client.query(sql, values);
}

async function updateCustomer(id, customer) {
    const client = await connect();
    const sql = 'UPDATE cliente SET nome=$1, cpf=$2 WHERE id=$3';
    const values = [customer.nome, customer.cpf, id];
    return await client.query(sql, values);
}



module.exports = {selectCustomer,selectCustomers, deleteCustomer, insertCustomer, updateCustomer};
