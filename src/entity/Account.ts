import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { AbstractEntity } from '../utils/AbstractEntity';
import { AccountHistory } from './AccountHistory';
import { User } from './User';

@Entity()
export class Account extends AbstractEntity {
    @Column({
        type: 'float8',
        default: 0,
    })
    private balance: number;

    @Column({
        type: 'float8',
        default: 0,
    })
    private totalInput: number;

    @Column({
        type: 'float8',
        default: 0,
    })
    private totalOutput: number;

    @OneToMany(() => AccountHistory, (historic) => historic.getAccount)
    private historic: Array<AccountHistory>;

    @OneToOne(() => User, (user) => user.getAccount)
    private user: User;

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

    public getTotalOutput(): number {
        return this.totalOutput;
    }

    public setTotalOutput(totalOutput: number): void {
        this.totalOutput = totalOutput;
    }

    public getHistoric(): Array<AccountHistory> {
        return this.historic;
    }

    public setHistoric(historic: Array<AccountHistory>): void {
        this.historic = historic;
    }

    public getUser(): User {
        return this.user;
    }

    public setUser(user: User): void {
        this.user = user;
    }
}
