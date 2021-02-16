import mongoose from 'mongoose';

import logger from './logger';
import constants from './constants';

mongoose.Promise = global.Promise;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
};

try {
	mongoose.connect(constants.MONGO_URL, options);
} catch (err) {
	if (err.message.code === 'ETIMEDOUT') {
		mongoose.connect(constants.MONGO_URL, options);
	} else {
		logger.error('Error while attempting to connect to database:');
		logger.error(err);
	}
}

mongoose.connection
	.once('open', async () => {
		const db = mongoose.connection.db;
		const { version } = await mongoose.mongo.Admin(db).buildInfo();
		logger.info(`mongoDB Running on v${version}`);
	})
	.on('error', (e) => {
		throw e;
	});
