import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserLocation } from 'src/userlocation/userlocation.entity';
@Entity()

export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true }) // Only available in Postgres
    email: string;

    @Column()
    password: string;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @OneToMany((_type) => UserLocation, (userlocation) => userlocation.user, { eager: true })
    userlocations: UserLocation[];
}