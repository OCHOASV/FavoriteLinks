// MySQL module
const mysql = require('mysql');
const {promisify} = require('util');

// Traemos de Keys las configuraciones, solo las de la base de datos
const {database} = require('./keys');

// Muchos hilos de MySQL
const MyPool = mysql.createPool(database);

// Con esto evitamos llamar a getConnection varias veces, solo llamamos al modulo MyPool
MyPool.getConnection((err, connection) =>{
		// Si hay algun error
		if (err) {
			// Verificando algunos errores
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.log('DataBase Connection was Closed...');
			}
			if (err.code === 'ERR_CON_COUNT_ERROR') {
				console.log('DataBase has to many Connections...');
			}
			if (err.code === 'ECONNREFUSED') {
				console.log('DataBase Connection was Refused...');
			}
		}
		// Si hay conexion
		if (connection) {
			connection.release();
			console.log('DataBase works...');
		}

		return;
	}
);

MyPool.query = promisify(MyPool.query);

module.exports = MyPool;