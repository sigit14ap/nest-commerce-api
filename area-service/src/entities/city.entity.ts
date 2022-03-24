import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Province } from "./province.entity";

@Entity({ name: 'Cities' })
export class City extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'int' })
    public province_id: number;

    @Column({ type: 'varchar' })
    public name: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Province, (province) => province.cities)
    @JoinColumn({ name: "province_id" })
    province: Province;
}