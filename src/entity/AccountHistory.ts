import { Entity, Column, ManyToOne } from "typeorm"; 
import { AbstractEntity } from "../utils/AbstractEntity";
import { Account } from "./Account";

export type TransactionType = 'debit' | 'credit';

@Entity()
export class AccountHistory extends AbstractEntity {

    @Column({
        type: 'float8',
        default: 0
    })
    value: number;

    @Column({
        type: 'varchar',
        nullable: true
    })
    description: string;

    @Column({
        type: 'enum',
        enum: ['debit', 'credit']
    })
    operation: TransactionType;

    @ManyToOne(() => Account, account => account.history)
    account: Account;
};