/*** Autenticaciones ***/
const passport = require('passport');
const strategy = require('passport-local').Strategy;
const MyPool = require('../database');
const helpers = require('../lib/helpers');

// Registro de usuario => local.singup
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
			// console.log(insertUser);
			newUser.id = insertUser.insertId;
			return done(null, newUser);
		}
	)
);

// Serializar usuario (guardar ID del usuario en user.id)
passport.serializeUser(
	(user, done) => {
		done(null, user.id);
	}
);

// Deserializar usuario (obtengo datos del ID que serialize antes)
passport.deserializeUser(
	async (id, done) => {
		const rows = await MyPool.query('SELECT * FROM user WHERE id = ?', [id]);
		done(null, rows[0]);
	}
);