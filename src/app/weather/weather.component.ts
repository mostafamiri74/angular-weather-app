import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  targetWeather!: any;
  cityForm!: FormGroup;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.cityForm = new FormGroup({
      city: new FormControl(null, Validators.required),
    });
  }

  onSubmit(city: string) {
    this.weatherService.getWeatherStation(city).subscribe((res: any) => {
      this.targetWeather = res;
      let sunsetTime = new Date(this.targetWeather.sys.sunset * 1000);
      this.targetWeather.sunset_time = sunsetTime.toLocaleTimeString();
      this.targetWeather.temp_celcius = (
        this.targetWeather.main.temp - 273.15
      ).toFixed(0);
      this.targetWeather.temp_min = (
        this.targetWeather.main.temp_min - 273.15
      ).toFixed(0);
      this.targetWeather.temp_max = (
        this.targetWeather.main.temp_max - 273.15
      ).toFixed(0);
      this.targetWeather.temp_feels_like = (
        this.targetWeather.main.feels_like - 273.15
      ).toFixed(0);
    });
    this.cityForm.reset();
  }
}
