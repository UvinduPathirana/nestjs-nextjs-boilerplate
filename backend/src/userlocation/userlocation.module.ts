import { Module } from '@nestjs/common';
import { UserlocationService } from './userlocation.service';
import { UserlocationController } from './userlocation.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLocation } from './userlocation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserLocation]), 
    AuthModule
  ],
  providers: [UserlocationService],
  controllers: [UserlocationController]
})
export class UserlocationModule {}
