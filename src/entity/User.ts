import { Entity, Column, OneToOne, JoinColumn, Unique } from 'typeorm';
import { AbstractEntity } from '../utils/AbstractEntity';
import { Account } from './Account';

@Entity()
@Unique('UK', ['username', 'password'])
export class User extends AbstractEntity {
    @Column({
        type: 'varchar',
        length: 80,
    })
    private name: string;

    @Column({
        type: 'varchar',
        length: 150,
        nullable: true,
    })
    private email: string;

    @Column({
        name: 'username',
        type: 'varchar',
        length: 150,
    })
    private username: string;

    @Column({
        name: 'password',
        type: 'varchar',
        length: 150,
    })
    private password: string;

    @Column({
        type: 'date',
        nullable: true,
    })
    private birth: Date;

    @OneToOne(() => Account, (account) => account.getUser, {
        cascade: ['insert'],
    })
    @JoinColumn()
    private account: Account;

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

    public getAccount(): Account {
        return this.account;
    }

    public setAccount(account: Account): void {
        this.account = account;
    }
}
