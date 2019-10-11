/*** Modules ***/
const express = require('express');
const morgan = require('morgan');
const handlerbars = require('express-handlebars');
const path = require('path');

/*** Inits ***/
const app = express();

/*** Settings ***/
// Port
app.set('port', process.env.PORT || 3000);
// Views directory
app.set('views', path.join(__dirname, 'views'));
// Templates Engine handlerbars config
app.engine(
	// Definimos handlerbars
	'.hbs',
	// Pasamos datos
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
// HTTP request
app.use(morgan('dev'));
// Manejar peticiones de usuarios
app.use(express.urlencoded({extended: false}));
// Enviar y Recibir JSON
app.use(express.json());

/*** Global Variables ***/
// Pasa a la siguiente funcion mientras el server procesa los req y res
app.use(
	(req, res, next) =>{
		next();
	}
);

/*** Routes ***/
app.use(require('./routes/router'));
app.use(require('./routes/security'));
// Colocamos un prefijo /links
app.use(require('/links', './routes/links'));


/*** Public Files ***/

/*** Run Server ***/
app.listen(
	app.get('port'), () => {
		console.log('Server on ' + app.get('port') + ' port...');
	}
);