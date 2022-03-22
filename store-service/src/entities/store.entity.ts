import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'Stores' })
export class Store extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'int' })
    public user_id: number;

    @Column({ type: 'varchar', unique: true })
    public domain: string;

    @Column({ type: 'varchar' })
    public name: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;
}