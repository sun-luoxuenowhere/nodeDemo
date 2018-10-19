const express = require('express');
const router = express.Router();
// const mysql = require('mysql');
const mysql = require('./database.js');
// console.log(mysql.database);
router.get('/books', function(req, res) {
	// console.log(req.body);
	// console.log(req.url);
	res.header('Access-Control-Allow-Origin', '*');
	mysql.database('select * from book', null, function(data) {
		// console.log(data);
		res.json(data);
	});
});

router.post('/books/book', function(req, res) {
	// console.log(req.body);
	res.header('Access-Control-Allow-Origin', '*');
	// connection.end();
	mysql.database('insert into book set ?', req.body, function(data) {
		res.json({ flag: 0 });
	});
});

router.post('/books/books', function(req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var id = req.body.id;
	mysql.database('delete from book where id=?', [id], function(data) {
		res.json({ flag: 0 });
	});
});

// 修改接口

router.post('/books/modify', function(req, res) {
	// console.log(req.url);
	res.header('Access-Control-Allow-Origin', '*');
	var id = req.body.id;
	mysql.database('select * from book where id =?', [id], function(data) {
		res.json(data);
	});
});

router.post('/books/modified', function(req, res) {
	console.log(req.url);
	res.header('Access-Control-Allow-Origin', '*');
	var info = req.body;
	console.log(info);
	var data = [info.name, info.author, info.category, info.description, info.id];
	mysql.database('update book set name=?,author=?,category=?,description=? where id=?', data, function(data) {
		res.json({ flag: 0 });
	});
});
module.exports = router;
