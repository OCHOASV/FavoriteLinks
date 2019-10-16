/*** Links  ***/
const express = require('express');
const router = express.Router();

// DataBase connection
const MyPool = require('../database');

// Ver el formulario
router.get('/add', (req, res) => {
		res.render('links/add');
	}
);
// Se diferencean por los metodos post y get
// Insert link
router.post('/add', async(req, res) => {
		// console.log(req.body);
		const {title, url, descripcion} = req.body;
		const newLink = {
			title,
			url,
			descripcion
		};
		await MyPool.query('INSERT INTO links set ?', [newLink]);
		res.redirect('/links');
	}
);

// Listar los links
router.get('/', async(req, res) => {
		const links = await MyPool.query('SELECT * FROM links');
		res.render('links/list', {links});
	}
);

module.exports = router;