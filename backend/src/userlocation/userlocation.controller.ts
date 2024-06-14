import { UserlocationService } from './userlocation.service';
import { User } from 'src/auth/user.entity';
import { Get, Post, Body, Controller, Param, UseGuards, Delete, Req } from '@nestjs/common';
import { UserLocation } from './userlocation.entity';
import { UserLocationDto } from './dto/create-userloc';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('userlocation')
@UseGuards(AuthGuard())
export class UserlocationController {
    constructor (private userlocationService: UserlocationService){}

    @Get()
    async findAll(@Req() request: Request, @GetUser() user: User): Promise<UserLocation[]> {
        // Log the request coming from the frontend
        console.log(request);
        return this.userlocationService.getLocatoinById(user.id);
    }


    @Post()
    async create(@Body() userLocation: UserLocationDto, @GetUser() user: User): Promise<UserLocation> {
        console.log(user);
        if(!user) {
            throw new Error('User not found');
        }
        return this.userlocationService.create(userLocation, user);
    }

    // Delete a location
    @Delete('/:id')
    async deleteLocation(@Param('id') id: number): Promise<{ message: string }> {
        return this.userlocationService.deleteLocation(id);
    }
}
