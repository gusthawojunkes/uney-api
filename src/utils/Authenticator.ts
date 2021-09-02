import { Credential } from './Credential';
import { User } from '../entity/User';
import { getConnection } from 'typeorm';

export class Authenticator {
    public static login = async (login: Credential): Promise<User> => {
        const username = login.getUsername();
        const password = login.getPassword();
        log(username, password);
        const user: User = await getConnection()
            .createQueryBuilder()
            .select('user')
            .from(User, 'user')
            .where('user.username = :p1', { p1: username })
            .andWhere('user.password = :p2', { p2: password })
            .getOne();

        const authenticated: boolean = authenticate(login, user);
        return authenticated ? user : null;
    };
}

const log = (user: string, pass: string) => {
    console.log(
        `${new Date().toLocaleDateString()} - AUTHENTICATE >>> [${user} - ${pass}]`
    );
};

const authenticate = (login: any, user: User) => {
    if (
        user === undefined ||
        login.username === undefined ||
        login.password === undefined
    ) {
        return false;
    }
    return login.password === user.password;
};
