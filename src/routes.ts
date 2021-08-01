import { Router } from 'express';
import { saveUser, getUsers, updateUsers, deleteUser, login } from './controller/UserController';
import { saveHistoric, getHistoric, updateHistoric, deleteHistoric } from './controller/AccountHistoryController';
import { getBalance } from './controller/AccountController';

const routes = Router();
const USERS = '/users';
const HISTORIC = '/historic';
const ACCOUNT = '/account';

routes.post('/login', login);

routes.post(USERS, saveUser);
routes.get(USERS, getUsers);
routes.put(USERS + '/:id', updateUsers);
routes.delete(USERS + '/:id', deleteUser);

routes.post(HISTORIC, saveHistoric);
routes.get(HISTORIC, getHistoric);
routes.put(HISTORIC + '/:id', updateHistoric);
routes.delete(HISTORIC + '/:id', deleteHistoric);

routes.get(ACCOUNT + '/:id/balance', getBalance);

export default routes;