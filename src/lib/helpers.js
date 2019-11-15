/*** Varios modulos ***/
const bcrypt = require('bcryptjs');
const helpers = {};

// Encriptar Passwords
helpers.encryptPass = async(password) =>{
	// Generar un hash en 10 saltos
	const salt = await bcrypt.genSalt(10);
	const hashPass = await bcrypt.hash(password, salt);
	return hashPass;
};

// Comparar Passwords para login
helpers.comparePass = async(password, DBpassword) => {
	try{
		return await bcrypt.compare(password, DBpassword);
	}
	catch(e){
		console.log(e);
	}
};

// Si hay sesion activa
helpers.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.redirect('/singin');
}

// Si NO hay sesion activa
helpers.isNotLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return next();
	}
	return res.redirect('/profile');
}

module.exports = helpers;