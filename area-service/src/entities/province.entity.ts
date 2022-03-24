import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { City } from "./city.entity";

@Entity({ name: 'Provinces' })
export class Province extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar' })
    public name: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => City, (city) => city.province)
    cities: City[]
}