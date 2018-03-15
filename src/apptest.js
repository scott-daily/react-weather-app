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

    var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
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
    if (this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
    }
    return (
    <div>
      <h1>Weather</h1>
      <form onSubmit={this.fetchData}>
        <label>Tell me the weather for
            <input placeholder={"City, Country"} type ="text" value={this.state.location} onChange={this.changeLocation} />
        </label>
      </form>
      <p className="temp-wrapper">
        <span className="temp">{currentTemp}</span>
        <span className="temp-symbol">°F</span>
      </p>
    </div>
    );
  }
}

export default App;
