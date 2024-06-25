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

    async getUserLocations(user: User): Promise<UserLocation[]> {
        return this.find({ where: { user } });
    }

    // Find if a location already exists
    async findExists(city: string, user: User): Promise<UserLocation> {
        // trim white spaces 
        city = city.trim().toLowerCase();
        return this.findOne({ where: { city, user } });
    }

    async createUserLocation({ city }: UserLocationDto, user: User): Promise<UserLocation>{
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