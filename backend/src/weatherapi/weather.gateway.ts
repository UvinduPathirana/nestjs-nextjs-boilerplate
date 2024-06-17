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
    try {
      const weather = await this.weatherService.getWeather(city);
      client.emit('weather', weather);
    } catch (error) {
      this.logger.error(`Failed to get weather for city: ${city}`, error.stack);
      client.emit('weather', 'Error: Failed to get weather data');
    }
  }

  afterInit(server: Server) {
    this.logger.log('WebSocket Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    if(this.city === undefined || this.city === null) {
      // Waiting for the client to send the city
      client.emit('weather', 'Error: Please send a city name');
      return;
    }
    
    const intervalId = setInterval(async () => {
      try {
        const weather = await this.weatherService.getWeather(this.city);
        client.emit('weather', weather);
      } catch (error) {
        this.logger.error(`Failed to get weather for city: ${this.city}`, error.stack);
        client.emit('weather', 'Error: Failed to get weather data');
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
