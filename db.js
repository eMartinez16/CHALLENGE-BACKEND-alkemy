const mysql = require('mysql');
const { Sequelize } = require('sequelize');

require('dotenv/config');
let instance = null;

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

con.connect(function(error) {
    if (error) {
        throw error.message;
    }
    console.log('db Conectada');
});

class dbService {
    //creo la clase dbService y dentro un método para instanciar una sola vez dicha clase. Si existe, no se crea.
    static getDbInstance() {
        return intance ? instance : new dbService();
    }
    async getAllData(query) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = 'SELECT * FROM personaje';
                con.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = dbService;
con.end();