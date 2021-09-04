import { getRepository, getConnection } from 'typeorm';
import { Account } from '../entity/Account';
import { Request, Response } from 'express';
import { AccountHistory } from '../entity/AccountHistory';
import { TransactionType } from '../entity/AccountHistory';
import { AccountTotals } from '../model/AccountTotals';

export const getBalance = async (request: Request, response: Response) => {
    const { id } = request.params;
    const account = await getRepository(Account).findOne(id);
    return response.json(account.balance);
};

export const getTotals = async (request: Request, response: Response) => {
    const accountId: number = Number(request.params);
    let totals: AccountTotals = new AccountTotals();
    console.log(totals);
    const accountRepository = getRepository(Account);
    accountRepository
        .findOne(accountId)
        .then((account) => {
            totals.totalInput = account.total_input;
            totals.totalOutput = account.total_output;
        })
        .catch(() => {});
    calculateTotalToday('credit', accountId)
        .then((value) => {
            totals.totalInputToday = value !== undefined ? value : 0;
        })
        .catch(() => (totals.totalInputToday = 0));
    calculateTotalToday('debit', accountId)
        .then((value) => {
            totals.totalOutputToday = value !== undefined ? value : 0;
        })
        .catch(() => (totals.totalOutputToday = 0));

    return response.json({
        totals,
    });
};

const calculateTotalToday = async (
    type: TransactionType,
    accountId: number
): Promise<number> => {
    const total: any = await getConnection()
        .createQueryBuilder()
        .select('SUM(historic.value)')
        .from(AccountHistory, 'historic')
        .where('historic.operation = :operation', { operation: type })
        .andWhere('historic.accountId = :accId', { accId: accountId })
        .andWhere('historic.created_at::DATE = CURRENT_DATE')
        .getRawOne();
    return Number(total);
};
