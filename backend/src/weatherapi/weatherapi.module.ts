import { Module } from '@nestjs/common';
import { WeatherapiController } from './weatherapi.controller';
import { WeatherapiService } from './weatherapi.service';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [WeatherapiController],
  providers: [WeatherapiService]
})
export class WeatherapiModule {}
