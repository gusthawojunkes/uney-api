import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity {
    @PrimaryGeneratedColumn()
    protected id: number;

    @CreateDateColumn({ type: 'timestamptz' })
    protected createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    protected updatedAt: Date;

    public getId(): number {
        return this.id;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }
}
