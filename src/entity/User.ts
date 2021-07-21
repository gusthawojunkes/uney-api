import {Entity, Column, OneToOne, JoinColumn, Unique} from 'typeorm';
import { AbstractEntity } from '../utils/AbstractEntity';
import { Account } from './Account';

@Entity()
@Unique("UK", ["username", "password"])
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
        name: 'username',
        type: 'varchar',
        length: 150
    })
    username: string;

    @Column({
        name: 'password',
        type: 'varchar',
        length: 150
    })
    password: string;

    @Column({
        type: 'date',
        nullable: true
    })
    birth: Date;

    @OneToOne(
        () => Account, 
        { cascade: ["insert"] }
    )
    @JoinColumn()
    account: Account;

};
