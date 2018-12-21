import React, { Component } from 'react';
import './App.css';
import BikeStationList from './components/BikeStationList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BikeStationList/>
      </div>
    );
  }
}

export default App;
