import React, { Component } from 'react';
import './App.css';
import BikeStationList from './components/BikeStationList';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <div className="row">
            <div className="col-10">
              <BikeStationList/>
            </div>
        </div>
        
      </div>
    );
  }
}

export default App;
