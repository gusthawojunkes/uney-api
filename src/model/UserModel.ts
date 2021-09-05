import { User } from '../entity/User';

export class UserModel {
    private name: string;
    private email: string;
    private username: string;
    private password: string;
    private birth: Date;
    private balance: number;
    private totalInput: number;
    private totalOutput: number;
    private accountId: number;

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getBirth(): Date {
        return this.birth;
    }

    public setBirth(birth: Date): void {
        this.birth = birth;
    }

    public getBalance(): number {
        return this.balance;
    }

    public setBalance(balance: number): void {
        this.balance = balance;
    }

    public getTotalInput(): number {
        return this.totalInput;
    }

    public setTotalInput(totalInput: number): void {
        this.totalInput = totalInput;
    }

    public gettotalOutput(): number {
        return this.totalOutput;
    }

    public setTotalOutput(totalOutput: number): void {
        this.totalOutput = totalOutput;
    }

    public getAccountId(): number {
        return this.accountId;
    }

    public setAccountId(accountId: number): void {
        this.accountId = accountId;
    }

    public static getModelFromUser(user: User): UserModel {
        const model = new UserModel();
        const account = user.getAccount();
        model.setName(user.getName());
        model.setEmail(user.getEmail());
        model.setUsername(user.getUsername());
        model.setPassword(user.getPassword());
        model.setBirth(user.getBirth());
        if (account !== undefined) {
            model.setAccountId(account.getId());
            model.setBalance(account.getBalance());
            model.setTotalInput(account.getTotalInput());
            model.setTotalOutput(account.getTotalOutput());
        }
        return model;
    }
}
