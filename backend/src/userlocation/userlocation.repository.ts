import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { UserLocation } from './userlocation.entity';
import { UserLocationDto } from './dto/create-userloc';
import { HttpException, HttpStatus } from '@nestjs/common';

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

    // Find if a location already exists
    async findExists(city: string, user: User): Promise<UserLocation> {
        const query = this.createQueryBuilder('userlocation');
        city = city.toLowerCase();
        query.where({ city, user });
        const location = await query.getOne();
        return location;
    }

    async createUserLocation({ city }: UserLocationDto, user: User): Promise<UserLocation | { message: string }>{
        city = city.toLowerCase();
        const found = await this.findExists(city, user);
        if (found) {
            throw new HttpException('Location already exists', HttpStatus.CONFLICT);
        };
        const userLocation = this.create({
            city,  
            user,
        });
        await this.save(userLocation);
        return userLocation;
    }
}