import { getRepository } from 'typeorm';
import { AccountHistory } from '../entity/AccountHistory';
import { Account } from '../entity/Account';
import { Request, Response } from 'express';
import { TransactionType } from '../entity/AccountHistory';

export const saveHistoric = async (request: Request, response: Response) => {
    const account = await getRepository(Account).findOne(request.params);
    const newHistoric = getNewHistoricFromBody(request.body, account);

    const value = newHistoric.value;
    const operation = newHistoric.operation;

    updateBalance(account, value, operation);
    
    const historic = await getRepository(AccountHistory).save(newHistoric);
    return response.json(historic);
};

export const getHistoric = async (_request: Request, response: Response) => {
    const historic = await getRepository(AccountHistory).find();
    return response.json(historic);
};

export const updateHistoric = async (request: Request, response: Response) => {
    const { id } = request.params;
    const historic = await getRepository(AccountHistory).update(id, request.body);
    if (historic.affected === 1) {
        const updated = await getRepository(AccountHistory).findOne(id);
        return response.json(updated);
    }
    return response.status(404).json({ message: 'Register not found' });
};

export const deleteHistoric = async (request: Request, response: Response) => {
    const { id } = request.params;
    const historic = await getRepository(AccountHistory).delete(id);
    if (historic.affected === 1) {
        return response.json({ message: `Register ${id} removed from database` });
    }
    return response.status(404).json({ message: 'Register not found' });
};

const getNewHistoricFromBody = (body: any, acc: Account): AccountHistory => {
    const historic = new AccountHistory();
    historic.value = body.value;
    historic.description = body.description;
    historic.operation = body.operation;
    historic.account = acc;
    return historic;
};

const updateBalance = (account: Account, value: number, type: TransactionType) => {
    if (type === 'credit') {
        account.balance += value;
        account.total_input += value;
    } else if (type === 'debit') {
        account.balance -= value;
        account.total_output += value;
    }
    getRepository(Account).update(account.id, account);
};