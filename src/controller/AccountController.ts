import { getRepository } from 'typeorm';
import { Account } from '../entity/Account';
import { Request, Response } from 'express';

export const getBalance = async (request: Request, response: Response) => {
    const { id } = request.params;
    const account = await getRepository(Account).findOne(id);
    return response.json(account.balance);
};