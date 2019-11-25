/*** Router ***/
const express = require('express');
const router = express.Router();
const helpers = require('../lib/helpers');

// Index
router.get('/',
	helpers.isNotLoggedIn,
	(req, res) => {
		res.render('index');
	}
);

module.exports = router;