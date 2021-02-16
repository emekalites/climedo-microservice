require('dotenv').config();

const devConfig = {
	MONGO_URL: process.env.MONGO_URL_DEV,
};

const prodConfig = {
	MONGO_URL: process.env.MONGO_URL_PROD,
};

const defaultConfig = {
	PORT: process.env.PORT || 5000,
	NODE_ENV: process.env.NODE_ENV,
};

function envConfig(env) {
	switch (env) {
		case 'development':
			return devConfig;
		case 'test':
			return testConfig;
		default:
			return prodConfig;
	}
}

export default {
	...defaultConfig,
	...envConfig(process.env.NODE_ENV),
};
