import 'dotenv/config';
import { Client } from 'pg';

export async function ensureDatabase(): Promise<void> {
    const nomeBanco = process.env.DB_NAME;
    if (!nomeBanco) {
        throw new Error('Variável DB_NAME não definida no arquivo .env');
    }
    
    const client = new Client({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'postgres',
    });
    
    await client.connect();
    try {
        const resultado = await client.query(
            'SELECT 1 FROM pg_database WHERE datname = $1',
            [nomeBanco],
        );
        if (resultado.rowCount === 0) {
            await client.query(`CREATE DATABASE "${nomeBanco.replace(/"/g, '""')}"`);
            console.log(`Banco "${nomeBanco}" criado com sucesso.`);
        }
    } finally {
        await client.end();
    }
}