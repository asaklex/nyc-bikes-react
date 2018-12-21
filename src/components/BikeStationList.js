import React, { Component } from 'react'
import BikeStation from './BikeStation'

const statusUrl = "http://gbfs.citibikenyc.com/gbfs/en/station_status.json"
const stationsInfoUrl = "http://gbfs.citibikenyc.com/gbfs/en/station_information.json"

class BikeStationList extends Component{
    constructor(props){
        super(props)
        this.state = {
            stations:[],
            allStatus: [],
            currentStation : ""
        }
    }

    render(){
        return(
        <table>
            <thead>
                <th>Station</th>
                <th>Available Bikes</th>
            </thead>
            <tbody>
                <BikeStation stations={this.state.stations} allStatus={this.state.allStatus} />
            </tbody>
        </table>
        );
    }
}

export default BikeStationList