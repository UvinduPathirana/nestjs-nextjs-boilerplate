import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';

// UserLocation Entity
@Entity('userlocation')
export class UserLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  city: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => User, (user) => user.userlocations, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

}