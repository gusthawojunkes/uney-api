import { Router, Request, Response } from 'express';
import { saveUser, getUsers, updateUsers, deleteUser, getUserById } from './controller/UserController';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    return res.json({ message: 'Hello World!'})
});

routes.post('/users', saveUser);
routes.get('/users', getUsers);
routes.put('/users/:id', updateUsers);
routes.delete('/users/:id', deleteUser);
routes.get('/user/:id', getUserById);

export default routes;