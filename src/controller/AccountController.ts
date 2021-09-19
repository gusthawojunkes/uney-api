import {
    getRepository,
    getConnection,
    Repository,
    Connection,
    SelectQueryBuilder,
} from 'typeorm';
import { Account } from '../entity/Account';
import { Request, Response } from 'express';
import { AccountHistory } from '../entity/AccountHistory';
import { TransactionType } from '../entity/AccountHistory';
import AccountTotals from '../model/AccountTotals';

export const getBalance = async (request: Request, response: Response) => {
    const { id } = request.params;
    const account = await getRepository(Account).findOne(id);
    return response.json(account.getBalance());
};

export const getTotals = async (request: Request, response: Response) => {
    const accountId: number = Number(request.params.id);
    let totals: AccountTotals = new AccountTotals();

    totals = await setAccountTotals(totals, accountId);
    totals = await setTotalsToday(totals, accountId);

    return response.json(totals);
};

export const createNewAccount = async (): Promise<Account> => {
    const accountRepository: Repository<Account> = getRepository(Account);
    let account: Account;
    await accountRepository
        .save(new Account())
        .then((newAccount: Account) => {
            account = newAccount;
        })
        .catch((error: Error) => {
            throw new Error(error.message);
        });

    return account;
};

const calculateTotalToday = async (
    type: TransactionType,
    accountId: number
): Promise<number> => {
    const databaseConnection: Connection = getConnection();
    let totalToday: number = 0;
    try {
        const totalTodayQuery: SelectQueryBuilder<AccountHistory> =
            databaseConnection
                .createQueryBuilder()
                .select('SUM(historic.value) AS total')
                .from(AccountHistory, 'historic')
                .where('historic.operation = :operation', { operation: type })
                .andWhere('historic.accountId = :accountId', {
                    accountId: accountId,
                })
                .andWhere('"historic"."createdAt"::DATE = CURRENT_DATE');

        const { total } = await totalTodayQuery.getRawOne();
        totalToday = total;
    } catch (error) {
        console.error(error);
    }

    return totalToday !== null ? totalToday : 0;
};

const setTotalsToday = async (
    totals: AccountTotals,
    accountId: number
): Promise<AccountTotals> => {
    const totalInputToday = await calculateTotalToday('credit', accountId);
    const totalOutputToday = await calculateTotalToday('debit', accountId);
    totals.setTotalInputToday(totalInputToday);
    totals.setTotalOutputToday(totalOutputToday);
    return totals;
};

const setAccountTotals = async (
    totals: AccountTotals,
    accountId: number
): Promise<AccountTotals> => {
    const accountRepository: Repository<Account> = getRepository(Account);
    const account: Account = await accountRepository.findOne(accountId);
    totals.setTotalInput(account.getTotalInput());
    totals.setTotalOutput(account.getTotalOutput());
    return totals;
};
