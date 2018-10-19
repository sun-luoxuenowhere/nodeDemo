const mysql = require('mysql');

exports.database = function(sql, data, callback) {
	let connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'sdj123456',
		database: 'newdata',
	});
	connection.connect();
	connection.query(sql, data, function(error, data) {
		callback(data);
	});
	connection.end();
};
