
let config;
if (process.env.NODE_ENV === 'test') {
	config = require('./config.unittest.js').default;
} else {
	config = require('./config.js').default;
}

export default config;
