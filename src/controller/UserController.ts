import { DeleteResult, getRepository, UpdateResult } from 'typeorm';
import { User } from '../entity/User';
import { Account } from '../entity/Account';
import { Request, Response } from 'express';
import { UserModel } from '../model/UserModel';

export const login = async (request: Request, response: Response) => {
    const login = request.body;
    const username: string = login.username;
    console.log(
        `${new Date().toLocaleDateString()} - AUTHENTICATE >>> [${username} - ${
            login.password
        }]`
    );
    const users: Array<User> = await getRepository(User).find({
        where: { username: username, password: login.password },
    });
    const userResponse: User = users[0];
    const authenticated: boolean = authenticate(login, userResponse);
    if (authenticated)
        return response.json(UserModel.getModelFromUser(userResponse));
    return response.status(401);
};

export const saveUser = async (request: Request, response: Response) => {
    const user = getNewUserFromBody(request.body);
    let newUser: User;
    await getRepository(User)
        .save(user)
        .then((u) => (newUser = u))
        .catch((err) => {
            return response.json(err.message);
        });

    return response.json(newUser);
};

export const getUsers = async (_request: Request, response: Response) => {
    const users: Array<User> = await getRepository(User).find();
    return response.json(users);
};

export const updateUsers = async (request: Request, response: Response) => {
    const { id } = request.params;
    const user: UpdateResult = await getRepository(User).update(
        id,
        request.body
    );
    if (user.affected === 1) {
        const updated = await getRepository(User).findOne(id);
        return response.json(updated);
    }
    return response.status(404).json({ message: 'User not found' });
};

export const deleteUser = async (request: Request, response: Response) => {
    const { id } = request.params;
    const user: DeleteResult = await getRepository(User).delete(id);
    if (user.affected === 1) {
        return response.json({ message: `User ${id} removed from database` });
    }
    return response.status(404).json({ message: 'User not found' });
};

const getNewUserFromBody = (body: any): User => {
    const user = new User();
    user.setName(body.name);
    user.setEmail(body.email);
    user.setUsername(body.username);
    user.setPassword(body.password);
    user.setBirth(body.birth);
    getRepository(Account)
        .save(new Account())
        .then((acc) => {
            user.setAccount(acc);
        });
    return user;
};

const authenticate = (login: any, user: User) => {
    if (
        user === undefined ||
        login.username === undefined ||
        login.password === undefined
    ) {
        return false;
    }
    return login.password === user.getPassword();
};
