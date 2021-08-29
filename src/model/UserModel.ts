import { User } from '../entity/User';

export class UserModel {
    name: string;
    email: string;
    username: string;
    password: string;
    birth: Date;
    balance: number;
    total_input: number;
    total_output: number;

    getModelFromUser(user: User) {
        const model = new UserModel();
        const account = user.account;
        model.name = user.name;
        model.email = user.email;
        model.username = user.username;
        model.password = user.password;
        model.birth = user.birth;
        if (account !== undefined) {
            model.balance = account.balance;
            model.total_input = account.total_input;
            model.total_output = account.total_output;
        }
        return model;
    }
}
