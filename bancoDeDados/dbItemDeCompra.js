async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    const itemCompra = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await itemCompra.query('SELECT NOW()');
    console.log(res.rows[0]);
    itemCompra.release();

    global.connection = pool;
    return pool.connect();
}

async function selectPurchaseItems() {
    const itemCompra = await connect();
    const res = await itemCompra.query("SELECT * FROM item_de_compra", []);
    return res.rows;
}

async function selectPurchaseItem(id) {
    const itemCompra = await connect();
    const res = await itemCompra.query('SELECT * FROM item_de_compra WHERE ID=$1', [id]);
    return res.rows;
}
 
async function deletePurchaseItem(id) {
    const itemCompra = await connect();
    return await itemCompra.query('DELETE FROM item_de_compra where id=$1;', [id]);
}

async function insertPurchaseItem(PurchaseItem) {
    const itemCompra = await connect();
    const sql = 'INSERT INTO item_de_compra(id_estoque, id_compra, quantidade) VALUES ($1,$2,$3);';
    const values = [PurchaseItem.id_estoque, PurchaseItem.id_compra, PurchaseItem.quantidade];
    return await itemCompra.query(sql, values);
}

async function updatePurchaseItem(id, PurchaseItem) {
    const itemCompra = await connect();
    const sql = 'UPDATE item_de_compra SET id_estoque=$1, id_compra=$2, quantidade=$3 WHERE id=$4';
    const values = [PurchaseItem.id_estoque, PurchaseItem.id_compra, PurchaseItem.quantidade, id];
    return await itemCompra.query(sql, values);
}



module.exports = {selectPurchaseItem,selectPurchaseItems, deletePurchaseItem, insertPurchaseItem, updatePurchaseItem};
