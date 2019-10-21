/*** Para modulo de Login y SingUp  ***/
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/singup',
	(req, res) => {
		res.render('./login/singup');
	}
);

router.post('/singup',
	// (req, res) => {
	// 	console.log(req.body);
	// }
	passport.authenticate('local.singup',{
			successRedirect: '/profile',
			failureRedirect: '/singup',
			failureFlash: true
		}
	)
);

router.get('/profile',
	(req, res) => {
		res.send('Profile...');
	}
);

module.exports = router;