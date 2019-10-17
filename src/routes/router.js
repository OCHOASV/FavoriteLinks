/*** Router ***/
const express = require('express');
const router = express.Router();

// Index
router.get('/',
	(req, res) => {
		res.send('It works!');
	}
);


module.exports = router;