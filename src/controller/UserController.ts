import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { Account } from '../entity/Account';
import { Request, Response } from 'express';

export const login = async (request: Request, response: Response) => {
    const login = request.body;
    const username: string = login.username;
    console.log(`AUTHENTICATE >>> [${username} - ${login.password}]`)
    const users = await getRepository(User).find({ where: { username: username }})
    const firstUser = users[0];
    const authenticated = authenticate(login, firstUser);
    if (authenticated) return response.json(firstUser);
    return response.status(401);
};

export const saveUser = async (request: Request, response: Response) => {
    const user = getNewUserFromBody(request.body);
    let newUser;
    await getRepository(User).save(user)
    .then(u => newUser = u)
    .catch(err => { return response.json(err.message) })

    return response.json(newUser);
};

export const getUsers = async (_request: Request, response: Response) => {
    const users = await getRepository(User).find();
    return response.json(users);
};

export const updateUsers = async (request: Request, response: Response) => {
    const { id } = request.params;
    const user = await getRepository(User).update(id, request.body);
    if (user.affected === 1) {
        const updated = await getRepository(User).findOne(id);
        return response.json(updated);
    }
    return response.status(404).json({ message: 'User not found' });
};

export const deleteUser = async (request: Request, response: Response) => {
    const { id } = request.params;
    const user = await getRepository(User).delete(id);
    if (user.affected === 1) {
        return response.json({ message: `User ${id} removed from database` }); 
    }
    return response.status(404).json({ message: 'User not found' });
};

const getNewUserFromBody = (body: any): User => {
    const user = new User();
    user.name = body.name;
    user.email = body.email;
    user.username = body.username;
    user.password = body.password;
    user.birth = body.birth;
    user.account = new Account();
    return user;
};

const authenticate = (login: any, user: User) => {
    if (user === undefined || login.username === undefined || login.password === undefined) return false;
    return login.password === user.password;
};