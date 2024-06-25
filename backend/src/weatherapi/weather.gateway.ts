/* eslint-disable @typescript-eslint/no-unused-vars */
import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { WeatherapiService } from './weatherapi.service';
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from './ws-auth.guard';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ cors: { origin: 'http://localhost:3002', credentials: true } })
@UseGuards(WsAuthGuard)
export class WeatherGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private weatherService: WeatherapiService, private readonly jwtService: JwtService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('WeatherGateway');
  private city: string;

  @SubscribeMessage('city')
  async handleWeatherEvent(client: Socket, city: string): Promise<void> {
    this.city = city;
    try {
      const weather = await this.weatherService.getWeather(city);
      client.emit('weather', weather);
    } catch (error) {
      this.logger.error(`Failed to get weather for city: ${city}`, error.stack);
      client.emit('error', 'Failed to get weather data');
    }
  }

  afterInit(server: Server) {
    this.logger.log('WebSocket Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    const intervalId = setInterval(async () => {
      try {
        const weather = await this.weatherService.getWeather(this.city);
        client.emit('weather', weather);
      } catch (error) {
        this.logger.error(`Failed to get weather for city: ${this.city}`, error.stack);
        client.emit('error', 'Failed to get weather data');
      }
    }, 90000);
    client.on('disconnect', () => {
      clearInterval(intervalId);
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
