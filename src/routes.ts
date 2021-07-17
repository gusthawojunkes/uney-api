import { Router, Request, Response } from 'express';
import { create, read, update, del, getUserById } from './controller/UserController';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    return res.json({ message: 'Hello World!'})
});

routes.post('/users', create);
routes.get('/users', read);
routes.put('/users/:id', update);
routes.delete('/users/:id', del);
routes.get('/user/:id', getUserById);

export default routes;