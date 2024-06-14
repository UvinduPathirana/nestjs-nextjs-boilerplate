import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { UserLocation } from './userlocation.entity';
import { UserLocationDto } from './dto/create-userloc';

@Injectable()
export class UserLocationRepository extends Repository<UserLocation> {
    constructor(private dataSource: DataSource) {
        super(UserLocation, dataSource.createEntityManager());
    }

    async getUserLoations(user: string): Promise<UserLocation[]> {
        const query = this.createQueryBuilder('userlocation');
        query.where({ user });
        const locations = await query.getMany();
        return locations;
    }

    async createUserLocation({ city }: UserLocationDto, user: User): Promise<UserLocation>{
        const userLocation = this.create({
            city,  
            user,
        });
        await this.save(userLocation);
        return userLocation;
    }
}