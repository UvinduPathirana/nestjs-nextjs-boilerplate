/* eslint-disable @typescript-eslint/no-unused-vars */
import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { WeatherapiService } from './weatherapi.service';
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from './ws-auth.guard';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ cors: { origin: 'http://localhost:3002', credentials: true } })
export class WeatherGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private weatherService: WeatherapiService, private readonly jwtService: JwtService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('WeatherGateway');
  private city: string;

  @UseGuards(WsAuthGuard)
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
    console.log(client.handshake.query.token)
    const token = client.handshake.query?.token as string;
    if (token) {
      try {
        const isVerified = this.jwtService.verify(token);
        if (!isVerified) {
          client.disconnect();
        } else {
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
      } catch (error) {
        this.logger.error(`Failed to verify token: ${token}`, error.stack);
        client.disconnect();
      }
    } else {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
