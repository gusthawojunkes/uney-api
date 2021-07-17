import {Entity, Column, OneToOne, JoinColumn} from 'typeorm';
import { AbstractEntity } from '../utils/AbstractEntity';
import { Account } from './Account';

@Entity()
export class User extends AbstractEntity {

    @Column({
        type: 'varchar',
        length: 80
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 150,
        nullable: true
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 150
    })
    username: string;

    @Column({
        type: 'varchar',
        length: 150
    })
    password: string;

    @Column({
        type: 'date',
        nullable: true
    })
    birth: Date;

    @OneToOne(() => Account)
    @JoinColumn()
    account: Account;

};
