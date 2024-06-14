import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherapiService {

    constructor(private http: HttpService) {}
    
    async getWeather(city: string) {
        const response = await this.http.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=1&aqi=no&alerts=no`).pipe(
            map(response => response.data)
        ).toPromise();
        return response;
    }
}