import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherapiService {
  constructor(
    private http: HttpService,
    private configService: ConfigService,
  ) {}

  async getWeather(city: string) {
    const url = `http://api.weatherapi.com/v1/forecast.json`;
    const params = {
      key: this.configService.get('WEATHER_API_KEY'),
      q: city,
      days: 1,
      aqi: 'no',
      alerts: 'no',
    };

    try {
        const response = await this.http.get(url, {params}).pipe(map(response => response.data)).toPromise();
        return response;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get weather data');
      }
  }
}
