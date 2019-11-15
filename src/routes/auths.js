/*** Para modulo de Login y SingUp  ***/
const express = require('express');
const router = express.Router();
const passport = require('passport');
const helpers = require('../lib/helpers');

// LogIn
router.get('/singin',
	helpers.isNotLoggedIn,
	(req, res) => {
		res.render('./login/singin');
	}
);

// LogIn
router.post('/singin',
	helpers.isNotLoggedIn,
	(req, res, next) => {
		passport.authenticate('local.singin',{
			successRedirect: '/profile',
			failureRedirect: '/singin',
			failureFlash: true
			}
		)(req, res, next);
	}
);

// Registro
router.get('/singup',
	helpers.isNotLoggedIn,
	(req, res) => {
		res.render('./login/singup');
	}
);

// Registro
router.post('/singup',
	// (req, res) => {
	// 	console.log(req.body);
	// }
	helpers.isNotLoggedIn,
	passport.authenticate('local.singup',{
			successRedirect: '/profile',
			failureRedirect: '/singup',
			failureFlash: true
		}
	)
);

// Perfil
router.get('/profile',
	// Verificamos si esta loggeado
	helpers.isLoggedIn,
	(req, res) => {
		res.render('profile');
	}
);

// Cerrar sesion
router.get('/singout',
	helpers.isLoggedIn,
	(req, res) => {
		req.logOut();
		res.redirect('/singin');
	}
);

module.exports = router;