import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import methodOverride from 'method-override';

import logger from './config/logger';
import constants from './config/constants';
import TabRoutes from './tabs/routes';

import './config/database';

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(helmet());
app.use(cors());
app.use(methodOverride());

app.use('/tabs', TabRoutes);

app.listen(port, function () {
	logger.info(
		`${constants.NODE_ENV} server started on port: ${constants.PORT}`
	);
});
