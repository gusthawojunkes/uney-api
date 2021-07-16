import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { request, Request, response, Response } from 'express';

export const getUsers = async (req: Request, res: Response) => {
     
    const users = await getRepository(User).find();
    return response.json(users);

};

export const saveUser = async (req: Request, res: Response) => {
    const user = await getRepository(User).save(request.body);
    response.json(user);
};