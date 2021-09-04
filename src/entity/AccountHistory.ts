import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../utils/AbstractEntity';
import { Account } from './Account';

export type TransactionType = 'debit' | 'credit';

@Entity()
export class AccountHistory extends AbstractEntity {
    @Column({
        type: 'float8',
        default: 0,
    })
    private value: number;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    private description: string;

    @Column({
        type: 'enum',
        enum: ['debit', 'credit'],
    })
    private operation: TransactionType;

    @Column({
        type: 'boolean',
        default: false,
    })
    private favorite: boolean;

    @ManyToOne(() => Account, (account) => account.getHistoric)
    private account: Account;

    public getValue(): number {
        return this.value;
    }

    public setValue(value: number): void {
        this.value = value;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getOperation(): TransactionType {
        return this.operation;
    }

    public setOperation(operation: TransactionType): void {
        this.operation = operation;
    }

    public isFavorite(): boolean {
        return this.favorite;
    }

    public setFavorite(favorite: boolean): void {
        this.favorite = favorite;
    }

    public getAccount(): Account {
        return this.account;
    }

    public setAccount(account: Account): void {
        this.account = account;
    }
}
