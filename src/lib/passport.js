/*** Autenticaciones ***/
const passport = require('passport');
const strategy = require('passport-local').Strategy;
const MyPool = require('../database');
const helpers = require('../lib/helpers');

// LogIn de usuario => local.singin
passport.use('local.singin',
	new strategy({
			usernameField: 'nick',
			passwordField: 'password',
			passReqToCallback: true
		},
		async(req, nick, password, done) => {
			// console.log(req.body)
			// console.log(nick)
			// console.log(password)

			// Selecciono todo con el nick como llave
			const rows = await MyPool.query("SELECT * FROM user WHERE nick = ? ", [nick]);
			// Si encuentra resultados
			if (rows.length > 0) {
				// Guardamos en user todo lo de la posicion 0
				const user = rows[0];
				/*
					Validamos el Password ingresado, llamamos a la funcion comparePass de helpers y le pasamos el pass que el usuario a metido y lo comparamos con el que se guarda en la DB. Devuelve TRUE o FALSE y lo guardamos en la variable validPassword
				*/
				const validPassword = await helpers.comparePass(password, user.password);
				// Si el pass es correcto
				if (validPassword) {
					// Termino el proceso con done, con null con error, se le pasa el user para que lo serialize y un mensaje
					done(null, user, req.flash('success', 'Welcome ' + user.nick));
				}
				// Si no
				else{
					done(null, false, req.flash('error', 'Invalid password !!!'));
				}
			}
			// si no hay resultados
			else{
				return done(null, false, req.flash('error', 'User ' + nick + ' doesn\'t exist !!!'));
			}
		}
	)
);

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