import { Router, Request, Response } from 'express';
import { saveUser, getUsers, updateUsers, deleteUser } from './controller/UserController';
import { saveHistoric, getHistoric, updateHistoric, deleteHistoric } from './controller/AccountHistoryController';

const routes = Router();
const USERS = '/users';
const HISTORIC = '/historic';

routes.get('/', (req: Request, res: Response) => {
    return res.json({ message: 'Hello World!'})
});

routes.post(USERS, saveUser);
routes.get(USERS, getUsers);
routes.put(USERS + '/:id', updateUsers);
routes.delete(USERS + '/:id', deleteUser);

routes.post(HISTORIC, saveHistoric);
routes.get(HISTORIC, getHistoric);
routes.put(HISTORIC + '/:id', updateHistoric);
routes.delete(HISTORIC + '/:id', deleteHistoric);

export default routes;