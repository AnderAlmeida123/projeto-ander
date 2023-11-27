async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    const brand = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await brand.query('SELECT NOW()');
    console.log(res.rows[0]);
    brand.release();

    global.connection = pool;
    return pool.connect();
}

async function selectMarcaNovas() {
    const brand = await connect();
    const res = await brand.query('SELECT * FROM marca', []);
    return res.rows;
}

async function selectMarcaNova(id) {
    const brand = await connect();
    const res = await brand.query('SELECT * FROM marca WHERE ID=$1', [id]);
    return res.rows;
}
 
async function deleteMarcaNova(id) {
    const brand = await connect();
    return await brand.query('DELETE FROM marca where id=$1;', [id]);
}

async function insertMarcaNova(MarcaNova) {
    const brand = await connect();
    const sql = 'INSERT INTO marca(nome,marca) VALUES ($1,$2);';
    const values = [ MarcaNova.nome, MarcaNova.marca];
    return await brand.query(sql, values);
}

async function updateMarcaNova(id, MarcaNova) {
    const brand = await connect();
    const sql = 'UPDATE marca SET  nome=$1, marca=$2 WHERE id=$3';
    const values = [ MarcaNova.nome,MarcaNova.marca, id];
    return await brand.query(sql, values);
}



module.exports = {selectMarcaNova,selectMarcaNovas, deleteMarcaNova, insertMarcaNova, updateMarcaNova};
