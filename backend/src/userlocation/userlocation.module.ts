import { Module } from '@nestjs/common';
import { UserlocationController } from './userlocation.controller';
import { UserlocationService } from './userlocation.service';

@Module({
  controllers: [UserlocationController],
  providers: [UserlocationService]
})
export class UserlocationModule {}
