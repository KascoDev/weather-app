// const express = require("express");
// const https = require("https")
// const bodyParser = require("body-parser");
//
// const app = express();
//
// app.use(bodyParser.urlencoded({extended: true}));
//
// app.get("/", function(req, res) {
//   res.sendfile(__dirname + "/index.html");
//
// });
//
// app.post("/", function(req, res){
//       const query = req.body.cityName;
//       const apiKey = "6055719cd9388e379a48c6b1d6ae039e";
//       const unit = "metric"
//       const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"units=" = unit;
//
//       https.get(url, function(response) {
//           console.log(response.statusCode);
//
//       response.on("data", function(data) {
//           const weatherData = JSON.parse(data);
//           const temp = weatherData.main.temp;
//           const weatherDescription = weatherData.weather[0].description;
//           const icon = weatherData.weather[0].icon;
//           const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
//           res.write("<p>The weather is currently " + weatherDescription + "<p>");
//           res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</hi>");
//           res.write(" < img src = " + imageURL +" > ");
//           res.send();
//         });
//       });
//     })
//
//
//     app.listen(3000, function() {
//       console.log("server is running on port 3000");
//
//
//       open weather API key 6055719cd9388e379a48c6b1d6ae039e




    let weather = {
      apiKey: "6055719cd9388e379a48c6b1d6ae039e",
      fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)

          .then((response) => {
            if (!response.ok) {
              alert("No weather found.");
              throw new Error("No weather found.");
            }
            return response.json();
          })
          .then((data) => this.displayWeather(data));
      },
      displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        // const { temp, feelslike, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temp").innerHTML = temp.toFixed(1) + "°C";
        // document.querySelector(".feelslike").innerHTML = "feelslike" + feelslike + "°C";
        document.querySelector(".humidity").innerHTML ="Humidity: " + humidity + "%";
        document.querySelector(".wind").innerHTML ="Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage ="url('https://source.unsplash.com/1600x900/?" + name + "')";
      },
      search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
      },
    };

    document.querySelector(".search button").addEventListener("click", function () {
      weather.search();
    });

    document
      .querySelector(".search-bar")
      .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
          weather.search();
        }
      });

    weather.fetchWeather("Witzenhausen");
