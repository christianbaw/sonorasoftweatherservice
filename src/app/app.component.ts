import { Component, Input } from "@angular/core";
import { WeatherService } from "./weather.service";
import { Chart } from "chart.js";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  private regForm: FormGroup;

  cities = ["Navojoa", "Obregon", "Hermosillo", "Nogales"];
  scales = [
    {
      Name: "Farenheit",
      value: "I"
    },
    {
      Name: "Celsisu",
      value: "M"
    }
  ];

  tableHeaders = ["Date", "Temperature"];

  @Input()
  city: string;

  chart = [];

  constructor(private _wheater: WeatherService) {}

  temperatures = [];

  ngOnInit() {
    this._wheater.getdailyForecast("Obregon", "M").subscribe(res => {
      let temp = res["data"].map(res => res.temp);
      let date = res["data"].map(res => res.datetime);
      let datefix = res["data"].map(res => res.ts);

      this.temperatures = res["data"].map(res => res);

      let weatherDates = [];
      datefix.forEach(res => {
        let datejs = new Date(res * 1000);
        weatherDates.push(
          datejs.toLocaleTimeString("en", {
            year: "numeric",
            month: "short",
            day: "numeric"
          })
        );
      });

      this.chart = new Chart("canvas", {
        type: "line",
        data: {
          labels: weatherDates,
          datasets: [
            {
              data: temp,
              borderColor: "#3cba9f",
              fill: false,
              label: "Temperature"
            }
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [
              {
                display: true,
                type: "time",
                time: {
                  displayFormats: {
                    quarter: "DDMMMYYYY"
                  }
                }
              }
            ],
            yAxes: [
              {
                display: true
              }
            ]
          }
        }
      });
    });
  }

  updateGraph(event) {
    this._wheater.getdailyForecast(event.target.value, "M").subscribe(res => {
      let temp = res["data"].map(res => res.temp);
      let date = res["data"].map(res => res.datetime);
      let datefix = res["data"].map(res => res.ts);

      this.temperatures = res["data"].map(res => res);

      let weatherDates = [];
      datefix.forEach(res => {
        let datejs = new Date(res * 1000);
        weatherDates.push(
          datejs.toLocaleTimeString("en", {
            year: "numeric",
            month: "short",
            day: "numeric"
          })
        );
      });

      this.chart = new Chart("canvas", {
        type: "line",
        data: {
          labels: weatherDates,
          datasets: [
            {
              data: temp,
              borderColor: "#3cba9f",
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                display: true,
                type: "time",
                time: {
                  displayFormats: {
                    quarter: "DDMMMYYYY"
                  }
                }
              }
            ],
            yAxes: [
              {
                display: true
              }
            ]
          }
        }
      });
    });
  }

  title = "Dashboard";
}
