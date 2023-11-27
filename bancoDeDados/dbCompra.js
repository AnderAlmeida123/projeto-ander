async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    const buy = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await buy.query('SELECT NOW()');
    console.log(res.rows[0]);
    buy.release();

    global.connection = pool;
    return pool.connect();
}

async function selectPurchases() {
    const buy = await connect();
    const res = await buy.query("SELECT *, TO_CHAR(data, 'dd/MM/yyyy') as data FROM compra", []);
    return res.rows;
}

async function selectPurchase(id) {
    const buy = await connect();
    const res = await buy.query('SELECT * FROM compra WHERE ID=$1', [id]);
    return res.rows;
}
 
async function deletePurchase(id) {
    const buy = await connect();
    return await buy.query('DELETE FROM compra where id=$1;', [id]);
}

async function insertPurchase(Purchase) {
    const buy = await connect();
    const sql = 'INSERT INTO compra(id_cliente, data, valor_total) VALUES ($1,$2,$3);';
    const values = [Purchase.id_cliente, Purchase.data, Purchase.valor_total];
    return await buy.query(sql, values);
}

async function updatePurchase(id, Purchase) {
    const buy = await connect();
    const sql = 'UPDATE compra SET id_cliente=$1, data=$2, valor_total=$3 WHERE id=$4';
    const values = [Purchase.id_cliente, Purchase.data, Purchase.valor_total, id];
    return await buy.query(sql, values);
}



module.exports = {selectPurchase,selectPurchases, deletePurchase, insertPurchase, updatePurchase};
