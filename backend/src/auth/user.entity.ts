import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true }) // Only available in Postgres
    email: string;

    @Column()
    password: string;
}