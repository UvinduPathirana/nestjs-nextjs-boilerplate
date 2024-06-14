import { Controller } from '@nestjs/common';
import { WeatherapiService } from './weatherapi.service';
import { Get, Param } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('weatherapi')
@UseGuards(AuthGuard())
export class WeatherapiController {
    constructor(private weatherService: WeatherapiService) {}

    @Get('/:city')
    async getWeather(@Param('city') city: string) {
        return this.weatherService.getWeather(city);
    }

}
