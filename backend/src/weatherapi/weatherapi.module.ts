import { Module } from '@nestjs/common';
import { WeatherGateway } from './weather.gateway';
import { WeatherapiService } from './weatherapi.service';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [],
  providers: [WeatherGateway, WeatherapiService]
})
export class WeatherapiModule {}
