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
    balance: number;

    @Column({
        type: 'float8',
        default: 0,
    })
    total_input: number;

    @Column({
        type: 'float8',
        default: 0,
    })
    total_output: number;

    @OneToMany(() => AccountHistory, (history) => history.account)
    history: Array<AccountHistory>;

    @OneToOne(() => User, (user) => user.account)
    user: User;
}
