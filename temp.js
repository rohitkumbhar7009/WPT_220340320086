
const express = require('express');
const app = express();

app.listen(8081, function () {
	console.log("server listening at port 8081...");
});

app.use(express.static('abc1'));

let db = {
	host: 'localhost',
	user: 'root',
	password: 'cdac',
	database: 'kolhapur',
	port: 3306
};

let mysql = require('mysql2');
let con = mysql.createConnection(db);

app.get('/insert', function (req, res) {


	var result = {
		status: false,
		details: {
			bookid: 0, bookname: "", price: 0
		}

	};

	let bookid = req.query.bookid;
	let bookname = req.query.bookname;
	let price = req.query.price;

	con.query('insert into book values (?,?,?)', [bookid, bookname, price],
		(err, row) => {
			if (err) {
				console.log("Error " + err)

			}
			else {
				if (row.affectedRows > 0) {
					result.status = true;
					console.log(result.status)
				}
			}

			res.send(result);
		});


});




