import { Injectable } from '@nestjs/common';
import { UserLocation } from './userlocation.entity';
import { User } from 'src/auth/user.entity';
import { UserLocationDto } from './dto/create-userloc';
import { UserLocationRepository } from './userlocation.repository';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UserlocationService {
    constructor(private userlocationRepository: UserLocationRepository) {}
    
    async create(userlocation: UserLocationDto, user: User): Promise<UserLocation> {
        return this.userlocationRepository.createUserLocation(userlocation, user);
    }
    
    async findAll(): Promise<UserLocation[]> {
        return this.userlocationRepository.find();
    }

    async getLocatoinById(id: string): Promise<UserLocation[]> {
        const found = await this.userlocationRepository.getUserLoations(id);
        if (!found) {
            throw new NotFoundException(`There are no tasks for this user`);
        }

        return found;
    }

    // Delete location

    async deleteLocation(id: number): Promise<{ message: string }> {
        const result = await this.userlocationRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Location with ID "${id}" not found`)
        }
        return { message: 'Location deleted successfully'}
    }

}
