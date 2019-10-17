const {format} = require('timeago.js');

// Este objeto lo ocuparemos en las vistas
const helpers = {};

// Este metodo timeago es el que llamaremos en la vista
helpers.timeago = (timestamp) => {
	return format(timestamp);
};

module.exports = helpers;