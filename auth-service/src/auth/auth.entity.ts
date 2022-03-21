import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'Users' })
export class Auth extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ 
        type: 'varchar',
        unique: true 
    })
    public email: string;

    @Exclude()
    @Column({ type: 'varchar' })
    public password: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;
}