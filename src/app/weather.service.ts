import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }

  getdailyForecast(city,scale){
    return this._http.get("https://chrissrdp2018.sytes.net/weather/api/weather/"+city+'&'+scale)
     .pipe(map(result => result));
  }

}
