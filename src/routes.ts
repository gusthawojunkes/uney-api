import { Router, Request, Response } from 'express';
import { getUsers, saveUser } from './controller/UserController';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    return res.json({ message: 'Hello World!'})
});

routes.get('/users', getUsers);
routes.post('/users/create', saveUser);

export default routes;