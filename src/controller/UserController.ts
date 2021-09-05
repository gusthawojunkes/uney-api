import { DeleteResult, getRepository, UpdateResult } from 'typeorm';
import { User } from '../entity/User';
import { Account } from '../entity/Account';
import { Request, Response } from 'express';
import { UserModel } from '../model/UserModel';
import { Credential } from '../utils/Credential';
import { Authenticator } from '../utils/Authenticator';
import { createNewAccount } from './AccountController';

export const login = async (request: Request, response: Response) => {
    const credentials: Credential = new Credential(request.body);
    let authenticated: boolean = false;
    const user: User = null;
    Authenticator.login(credentials)
        .then((user) => {
            user = user;
        })
        .catch((error) => console.error(error));

    console.log(user);
    authenticated = user !== null;

    if (authenticated) return response.json(UserModel.getModelFromUser(user));
    return response.status(401);
};

export const createNewUser = async (request: Request, response: Response) => {
    const user = await getNewUserFromBody(request.body);

    const userRepository = getRepository(User);
    let newUser: User;

    await userRepository
        .save(user)
        .then((persistedUser) => (newUser = persistedUser))
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

const getNewUserFromBody = async (body: any): Promise<User> => {
    const user = new User();
    const newAccount: Account = await createNewAccount();

    user.setName(body.name);
    user.setEmail(body.email);
    user.setUsername(body.username);
    user.setPassword(body.password);
    user.setBirth(body.birth);
    user.setAccount(newAccount);

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
