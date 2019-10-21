/*** Autenticaciones ***/
const passport = require('passport');
const strategy = require('passport-local').Strategy;
const MyPool = require('../database');
const helpers = require('../lib/helpers');

// Autenticacion local.singup
passport.use('local.singup',
	new strategy({
			usernameField: 'nick',
			passwordField: 'password',
			passReqToCallback: true
		},
		async(req, nick, password, done) => {
			const {nombre} = req.body;
			const newUser = {
				nick,
				password,
				nombre
			};
			newUser.password = await helpers.encryptPass(password);
			const insertUser = await MyPool.query('INSERT INTO user set ?', [newUser]);
			// req.flash('success', 'Usuario Agregado con Exito !!!');
			// res.redirect('/links');
		}
	)
);