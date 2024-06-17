/* eslint-disable @typescript-eslint/no-unused-vars */
import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { WeatherapiService } from './weatherapi.service';

@WebSocketGateway({ cors: { origin: 'http://localhost:3000', credentials: true } })
export class WeatherGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private weatherService: WeatherapiService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('WeatherGateway');
  private city: string;

  @SubscribeMessage('city')
  async handleWeatherEvent(client: Socket, city: string): Promise<void> {
    this.city = city;
    const weather = await this.weatherService.getWeather(city);
    client.emit('weather', weather);
  }

  afterInit(server: Server) {
    this.logger.log('WebSocket Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    
    setInterval(async () => {
      const weather = await this.weatherService.getWeather(this.city); 
      client.emit('weather', weather);
    }, 90000);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
