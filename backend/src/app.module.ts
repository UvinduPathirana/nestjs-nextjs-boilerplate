import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
