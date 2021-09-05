import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity {
    @PrimaryGeneratedColumn()
    private id: number;

    @CreateDateColumn({ type: 'timestamptz' })
    private createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    private updatedAt: Date;

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
