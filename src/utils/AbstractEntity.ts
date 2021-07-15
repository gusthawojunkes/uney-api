import { PrimaryGeneratedColumn, Column } from "typeorm";

export abstract class AbstractEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

}