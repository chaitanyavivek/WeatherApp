let weather = {
    apiKey: "5bbdaf41484fb690e791b035a4c1c430",
    fetchWeather: function(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${this.apiKey}`)
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
        const { temp} = data.main.temp;
        let speed  = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
          "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = data.main.temp + "°C";
        document.querySelector(".humidity").innerText =
          "Humidity: " + data.main.humidity + "%";
        document.querySelector(".pressure").innerText=
        "Pressure: "+data.main.pressure + "%";
        document.querySelector(".wind").innerText =
          "Wind speed: " +data.wind.speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
          "url('https://source.unsplash.com/1600x900/?" + name + "')";
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
      weather.fetchWeather("delhi");