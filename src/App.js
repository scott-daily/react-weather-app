import React, { Component } from 'react';
import './App.css';
import xhr from 'xhr';

class App extends Component {
  state = {
    location: '',
    data: {}
  };

  fetchData = (event) => {
    event.preventDefault();
    var location = encodeURIComponent(this.state.location);

    var urlPrefix = 'http://api.openweathermap.org/data/2.5/weather?q=';
    var urlSuffix = '&APPID=090331b296060a63c91fc129b8f626c7&units=imperial';
    var url = urlPrefix + location + urlSuffix;

    var self=this;

    xhr({
      url: url
    }, function (err, data) {
      self.setState({
        data: JSON.parse(data.body)
      });
    });
  };

  changeLocation = (event) => {
    this.setState({
      location: event.target.value
    });
  };

  render() {
    var currentTemp = 'not loaded yet';
    var currentHumidity = 'not loaded yet';
    var currentSky = 'not loaded yet';
    if (this.state.data.main) {
      currentTemp = this.state.data.main.temp;
      currentHumidity = this.state.data.main.humidity;
      currentSky = this.state.data.weather[0]["description"];
    }
    return (
    <div>
      <h1>Today's Weather</h1>
      <form onSubmit={this.fetchData}>
        <label>Tell me the weather for
            <input placeholder={"City"} type ="text" value={this.state.location} onChange={this.changeLocation} />
        </label>
      </form>
      <p className="temp-wrapper">
        <span className="temp">The temperature is currently {currentTemp}</span>
        <span className="temp-symbol">°F</span>
      </p>
      <p className="humidity-wrapper">
        <span className="humidity">The humidity is currently {currentHumidity}%</span>
      </p>
      <p className="sky-wrapper">
        <span className="sky">The weather condition is currently {currentSky}</span>
      </p>
    </div>
    );
  }
}

export default App;
