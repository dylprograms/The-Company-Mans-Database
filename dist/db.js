import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'company_db',
    password: '',
    port: 5432,
});
pool.on('connect', () => {
    console.log('Connected to the database');
});
export default pool;
