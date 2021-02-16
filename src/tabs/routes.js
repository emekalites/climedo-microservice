import { Router } from 'express';

import * as TabController from './controller';

const routes = new Router();

routes.post('/', TabController.create);
routes.put('/:tabId', TabController.update);
routes.get('/', TabController.fetchAll);
routes.delete('/:tabId', TabController.remove);

export default routes;
