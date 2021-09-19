import Credential from './Credential';
import DateUtils from './DateUtils';
import { User } from '../entity/User';
import { getConnection, Connection, SelectQueryBuilder } from 'typeorm';

export default class Authenticator {
    public static login = async (login: Credential): Promise<User> => {
        const username = login.getUsername();
        const password = login.getPassword();
        logCredentials(username, password);
        const databaseConnection: Connection = getConnection();

        const loginQuery: SelectQueryBuilder<User> = databaseConnection
            .createQueryBuilder()
            .select('user')
            .from(User, 'user')
            .where('user.username = :p1', { p1: username })
            .andWhere('user.password = :p2', { p2: password });

        const user: User = await loginQuery.getOne();

        const authenticated: boolean = authenticate(login, user);
        return authenticated ? user : null;
    };
}

const logCredentials = (user: string, pass: string) => {
    console.log(
        `${DateUtils.formatNow()} - AUTHENTICATING >>> [${user} - ${pass}]`
    );
};

const logUser = (user: User) => {
    console.log(
        `${DateUtils.formatNow()} - FOUND USER >>> [${user.getName()}]`
    );
};

const authenticate = (login: any, user: User) => {
    if (
        user === undefined ||
        user === null ||
        login.username === undefined ||
        login.password === undefined
    ) {
        return false;
    }
    logUser(user);
    return login.password === user.getPassword();
};
