import { DeleteResult, getRepository, UpdateResult } from 'typeorm';
import { AccountHistory } from '../entity/AccountHistory';
import { Account } from '../entity/Account';
import { Request, Response } from 'express';
import { TransactionType } from '../entity/AccountHistory';

export const saveHistoric = async (request: Request, response: Response) => {
    const accId: number = request.body.accountId;
    const account: Account = await getRepository(Account).findOne(accId);
    const newHistoric: AccountHistory = getNewHistoricFromBody(
        request.body,
        account
    );

    const value: number = newHistoric.getValue();
    const operation: TransactionType = newHistoric.getOperation();

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
    cleanValuesFromAccount(account, historic);
    const register: DeleteResult = await getRepository(AccountHistory).delete(
        id
    );
    if (register.affected === 1) {
        return response.json(account.getBalance());
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
    historic.setValue(body.value);
    historic.setDescription(body.description);
    historic.setOperation(body.operation);
    historic.setAccount(acc);
    return historic;
};

const updateBalance = async (
    account: Account,
    value: number,
    type: TransactionType
) => {
    if (type === 'credit') {
        account.setBalance(account.getBalance() + value);
        account.setTotalInput(account.getTotalInput() + value);
    } else if (type === 'debit') {
        account.setBalance(account.getBalance() - value);
        account.setTotalOutput(account.getTotalOutput() + value);
    }
    return await getRepository(Account).update(account.id, account);
};

const cleanValuesFromAccount = async (
    account: Account,
    historic: AccountHistory
) => {
    const type: TransactionType = historic.getOperation();
    const value: number = historic.getValue();
    if (type === 'credit') {
        account.setBalance(account.getBalance() - value);
        account.setTotalInput(account.getTotalInput() - value);
    } else if (type === 'debit') {
        account.setBalance(account.getBalance() + value);
        account.setTotalOutput(account.getTotalOutput() - value);
    }
    return await getRepository(Account).update(account.id, account);
};
