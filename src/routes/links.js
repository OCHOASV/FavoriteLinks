/*** Parea modulo Links  ***/
const express = require('express');
const router = express.Router();
const helpers = require('../lib/helpers');

// DataBase connection
const MyPool = require('../database');

// Ver el formulario
router.get('/add',
	helpers.isLoggedIn,
	(req, res) => {
		res.render('links/add');
	}
);
// Insert link
router.post('/add',
	helpers.isLoggedIn,
	async(req, res) => {
		// console.log(req.body);
		const {title, url, descripcion} = req.body;
		const newLink = {
			title,
			url,
			descripcion
		};
		await MyPool.query('INSERT INTO links set ?', [newLink]);
		req.flash('success', 'Link Agregado con Exito !!!');
		res.redirect('/links');
	}
);

// Listar los links
router.get('/',
	helpers.isLoggedIn,
	async(req, res) => {
		const links = await MyPool.query('SELECT * FROM links');
		res.render('links/list', {links});
	}
);

// Editar un link
router.get('/edit/:id',
	helpers.isLoggedIn,
	async(req, res) => {
		const linkID = req.params.id;
		const link = await MyPool.query('SELECT * FROM links WHERE id = ?', [linkID]);
		res.render('links/edit', {link: link[0]});
	}
);

// Editar un link
router.post('/edit/:id',
	helpers.isLoggedIn,
	async(req, res) => {
		const linkID = req.params.id;
		const {title, url, descripcion} = req.body;
		const newLink = {
			title,
			url,
			descripcion
		};
		await MyPool.query('UPDATE links set ? WHERE id = ?', [newLink, linkID]);
		req.flash('success', 'Link Editado con Exito !!!');
		res.redirect('/links');
	}
);

// Eliminar un link
router.get('/delete/:id',
	helpers.isLoggedIn,
	async(req, res) => {
		const linkID = req.params.id;
		await MyPool.query('DELETE FROM links WHERE id = ?', [linkID]);
		req.flash('success', 'Link Eliminado con Exito !!!');
		// Segun el curso
		// const {id} = req.params;
		// await MyPool.query('DELETE FROM links WHERE id = ?', [id]);
		res.redirect('/links');
	}
);

module.exports = router;