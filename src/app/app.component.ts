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


  selectedCity: any;
  selectedScale: any;

  cities = [
    {
      id: 1,
      name: "Navojoa"
    },
    {
      id: 2,
      name: "Obregon"
    },
    {
      id: 3,
      name: "Hermosillo"
    },
    {
      id: 3,
      name: "Nogales"
    }
  ];

  scales = [
    {
      id: 1,
      name: "Farenheit",
      value: "I"
    },
    {
      id: 2,
      name: "Celsius",
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

  updateGraph(type, value) {
    //validation
    console.log(this.selectedCity);
    console.log(this.selectedScale);
    if (type === "city") {
      this.selectedCity = this.cities.filter(x => x.id == value)[0];
    } else if (type === "scale") {
      this.selectedScale = value;
    }

    if (typeof this.selectedScale == "undefined") {
      this.selectedScale = "M";
    }
    if (typeof this.selectedCity == "undefined") {
      this.selectedScale.name = "Obregon";
    }

    this._wheater
      .getdailyForecast(this.selectedCity.name, this.selectedScale)
      .subscribe(res => {
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
