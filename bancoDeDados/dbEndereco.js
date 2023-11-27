async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    const address = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await address.query('SELECT NOW()');
    console.log(res.rows[0]);
    address.release();

    global.connection = pool;
    return pool.connect();
}

async function selectAddresss() {
    const address = await connect();
    const res = await address.query('SELECT * FROM endereco', []);
    return res.rows;
}

async function selectAddress(id) {
    const address = await connect();
    const res = await address.query('SELECT * FROM endereco WHERE ID=$1', [id]);
    return res.rows;
}
 
async function deleteAddress(id) {
    const address = await connect();
    return await address.query('DELETE FROM endereco where id=$1;', [id]);
}

async function insertAddress(Address) {
    const address = await connect();
    const sql = 'INSERT INTO endereco(id_cliente,cep,rua,bairro,cidade,estado,numero,referencia) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);';
    const values = [Address.id_cliente, Address.cep,Address.rua,Address.bairro,Address.cidade,Address.estado,Address.numero,Address.referencia];
    return await address.query(sql, values);
}

async function updateAddress(id, Address) {
    const address = await connect();
    const sql = 'UPDATE endereco SET id_cliente=$1, cep=$2, rua=$3, bairro=$4, cidade=$5, estado=$6, numero=$7, referencia=$8 WHERE id=$9';
    const values = [Address.id_cliente, Address.cep,Address.rua,Address.bairro,Address.cidade,Address.estado,Address.numero,Address.referencia,id];
    return await address.query(sql, values);
}


module.exports = {selectAddress,selectAddresss, deleteAddress, insertAddress, updateAddress};
