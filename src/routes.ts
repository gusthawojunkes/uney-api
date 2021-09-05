import { Router } from 'express';
import {
    createNewUser,
    getUsers,
    updateUsers,
    deleteUser,
    login,
} from './controller/UserController';
import {
    saveHistoric,
    getHistoric,
    updateHistoric,
    deleteHistoric,
    markAsFavorite,
} from './controller/AccountHistoryController';
import { getBalance, getTotals } from './controller/AccountController';

const routes = Router();
const USERS = '/users';
const HISTORIC = '/historic';
const ACCOUNT = '/account';

routes.post('/login', login);

routes.post(USERS, createNewUser);
routes.get(USERS, getUsers);
routes.put(USERS + '/:id', updateUsers);
routes.delete(USERS + '/:id', deleteUser);

routes.post(HISTORIC, saveHistoric);
routes.get(HISTORIC, getHistoric);
routes.put(HISTORIC + '/:id', updateHistoric);
routes.delete(HISTORIC + '/:id', deleteHistoric);
routes.patch(HISTORIC + '/favorite/:id', markAsFavorite);

routes.get(ACCOUNT + '/:id/balance', getBalance);
routes.get(ACCOUNT + '/:id/totals', getTotals);

export default routes;
