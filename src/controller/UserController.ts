import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { Request, Response } from 'express';

export const create = async (request: Request, response: Response) => {
    const user = await getRepository(User).save(request.body);
    return response.json(user);
};

export const read = async (response: Response) => {
    const users = await getRepository(User).find();
    return response.json(users);
};

export const update = async (request: Request, response: Response) => {
    const { id } = request.params;
    const user = await getRepository(User).update(id, request.body);
    if (user.affected === 1) {
        const updated = await getRepository(User).findOne(id);
        return response.json(updated);
    }
    return response.status(404).json({ message: 'User not found' });
};

export const del = async (request: Request, response: Response) => {
    const { id } = request.params;
    const user = await getRepository(User).delete(id);
    if (user.affected === 1) {
        return response.json({ message: `User ${id} removed from database` }); 
    }
    return response.status(404).json({ message: 'User not found' });
};

export const getUserById = async (request: Request, response: Response) => {
    const { id } = request.params;
    const user = await getRepository(User).findOne(id);
    return response.json(user);
};