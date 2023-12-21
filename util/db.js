import knex from 'knex'

const connection = {
    client: 'mssql',
    connection: {
        user: process.env.DB_USER || 'sa',
        password: process.env.DB_PWD || '123',
        server: process.env.DB_HOST || '127.0.0.1',
        database: process.env.DB_NAME || 'QuanLyNhaKhoa',
        port: parseInt(process.env.DB_PORT) || 1433,
        options: {
            trustedconnection: true,
            trustServerCertificate: true
        },
    },
};

export const db = knex(connection)