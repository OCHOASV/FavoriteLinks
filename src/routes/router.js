/*** Router ***/
const express = require('express');
const router = express.Router();

// Index
router.get('/',
	(req, res) => {
		res.render('index');
	}
);

router.get('/403',
	(req, res) => {
		res.render('403');
	}
);

/*router.get(
	'*',
	(req, res) => {
		res.render('403');
	}
);
*/

module.exports = router;