import { DeleteResult, getRepository, UpdateResult } from 'typeorm';
import { AccountHistory } from '../entity/AccountHistory';
import { Account } from '../entity/Account';
import { Request, Response } from 'express';
import { TransactionType } from '../entity/AccountHistory';
import { copyFileSync } from 'fs';

export const saveHistoric = async (request: Request, response: Response) => {
    const accId: number = request.body.accountId;
    const account: Account = await getRepository(Account).findOne(accId);
    const newHistoric: AccountHistory = getNewHistoricFromBody(
        request.body,
        account
    );

    const value: number = newHistoric.value;
    const operation: TransactionType = newHistoric.operation;

    updateBalance(account, value, operation)
        .then(() => {
            getRepository(AccountHistory)
                .save(newHistoric)
                .then((historic) => {
                    return response.json(historic);
                });
        })
        .catch((err) => {
            return response.status(500).send({ error: err.message });
        });
};

export const getHistoric = async (_request: Request, response: Response) => {
    const historic: Array<AccountHistory> = await getRepository(
        AccountHistory
    ).find({
        order: {
            created_at: 'DESC',
        },
    });
    return response.json(historic);
};

export const updateHistoric = async (request: Request, response: Response) => {
    const { id } = request.params;
    const historic: UpdateResult = await getRepository(AccountHistory).update(
        id,
        request.body
    );
    if (historic.affected === 1) {
        const updated = await getRepository(AccountHistory).findOne(id);
        return response.json(updated);
    }
    return response.status(404).json({ message: 'Register not found' });
};

export const deleteHistoric = async (request: Request, response: Response) => {
    const { id } = request.params;
    const accId: number = request.body.accountId;
    const account: Account = await getRepository(Account).findOne(accId);
    const historic = await getRepository(AccountHistory).findOne(id);
    console.log(historic);
    cleanValuesFromAccount(account, historic);
    const register: DeleteResult = await getRepository(AccountHistory).delete(
        id
    );
    if (register.affected === 1) {
        return response.json(account.balance);
    }
    return response.status(404).json({ message: 'Register not found' });
};

export const markAsFavorite = async (request: Request, response: Response) => {
    const { id } = request.params;
    const historic: UpdateResult = await getRepository(AccountHistory).update(
        id,
        request.body
    );
    if (historic.affected === 1) {
        const historic: AccountHistory = await getRepository(
            AccountHistory
        ).findOne(id);
        return response.json(historic);
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

const updateBalance = async (
    account: Account,
    value: number,
    type: TransactionType
) => {
    if (type === 'credit') {
        account.balance += value;
        account.total_input += value;
    } else if (type === 'debit') {
        account.balance -= value;
        account.total_output += value;
    }
    return await getRepository(Account).update(account.id, account);
};

const cleanValuesFromAccount = async (
    account: Account,
    historic: AccountHistory
) => {
    const type: TransactionType = historic.operation;
    const value: number = historic.value;
    if (type === 'credit') {
        account.balance -= value;
        account.total_input -= value;
    } else if (type === 'debit') {
        account.balance += value;
        account.total_output -= value;
    }
    return await getRepository(Account).update(account.id, account);
};
