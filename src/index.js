/*** Modules ***/
const express = require('express');
const morgan = require('morgan');
const handlerbars = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLsession = require('express-mysql-session');
const passport = require('passport');

// DB connections
const {database} = require('./keys');

/*** Inits ***/
const app = express();
require('./lib/passport');

/*** Settings ***/
// Port
app.set('port', process.env.PORT || 3000);
// Public Files
app.use(express.static(path.join(__dirname, 'public')));
// Views directory
app.set('views', path.join(__dirname, 'views'));
// Templates Engine handlerbars config
app.engine(
	// Handlerbars def
	'.hbs',
	handlerbars({
		// Archivo que manejara todas las vistas
		defaultLayout: 'main',
		// main Dir
		layautsDir: path.join(app.get('views'), 'layouts'),
		// Partials Dir
		partialsDir: path.join(app.get('views'), 'partials'),
		// Extension Files
		extname: '.hbs',
		// Funciones de handlebars
		helpers: require('./lib/handlebars')
	})
);
// Call template engine
app.set('view engine', '.hbs');

/*** Middlewares ***/
// Sesiones
app.use(session({
		secret: 'FavoriteLinksOCHOA',
		resave: false,
		saveUninitialized: false,
		store: new MySQLsession(database)
	}
));
// Mensajes
app.use(flash());
// HTTP request
app.use(morgan('dev'));
// Manejar peticiones de usuarios
app.use(express.urlencoded({extended: false}));
// Enviar y Recibir JSON
app.use(express.json());
// Iniciar passport
app.use(passport.initialize());
app.use(passport.session());

/*** Global Variables ***/
// Pasa a la siguiente funcion mientras el server procesa los req y res
app.use(
	(req, res, next) =>{
		app.locals.success = req.flash('success');
		app.locals.error = req.flash('error');
		// Cuando serializamos el user, ponemos en variable global toda su info
		app.locals.user = req.user;
		next();
	}
);

/*** Routes ***/
app.use(require('./routes/router'));
// Router de las Autenticaciones
app.use(require('./routes/auths'));
// Colocamos un prefijo /links
app.use('/links', require('./routes/links'));

/*** Evitar ingreso a cualquier archivo/directorio ***/
app.use('/*',
	(req, res, next) => {
		res.render('403');
	}
);

/*** Run Server ***/
app.listen(
	app.get('port'), () => {
		console.log('Server on ' + app.get('port') + ' port...');
	}
);