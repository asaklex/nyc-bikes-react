import React, { Component } from 'react'

const statusUrl = "http://gbfs.citibikenyc.com/gbfs/en/station_status.json"
const stationsInfoUrl = "http://gbfs.citibikenyc.com/gbfs/en/station_information.json"
const itemsByPage = 10

class BikeStationList extends Component{
    
    constructor(props){
        super(props)

        this.state = {
            stations:[],
            filteredStations:[],
            allStatus: [],
            currentStation : "",
            startIndex:0,
            finishIndex: itemsByPage,
            totalPages: 0
        }

        this.getStationsInfos = this.getStationsInfos.bind(this)
        this.getAllStationsStatus = this.getAllStationsStatus.bind(this)
        this.updateStatus = this.updateStatus.bind(this)
        this.enterHover = this.enterHover.bind(this)
        this.exitHover = this.exitHover.bind(this)
        this.gotoPage = this.gotoPage.bind(this)
        this.searchStation = this.searchStation.bind(this)
    }

    componentWillMount(){
        this.getStationsInfos()
    }

    render(){
        return(
            <div>
                <hr/>
                <form className="form-inline">
                    <div className="row">
                        <div className="col-5">

                            <div className="form-group">
                                <label>Go To Page : </label>
                                <select className="form-control ml-1" onChange={this.gotoPage}>
                                    {this.state.filteredStations.slice(0,this.state.totalPages).map((it,i) => (<option key={i+1} value={i+1}>{i+1}</option>))}
                                </select>
                            </div>
                            
                        </div>

                        <div className="col-7">
                            <input className="form-control" placeholder="Search Station" onChange={this.searchStation}/>
                        </div>
                        
                    </div>
                </form>
                
                <hr/>

                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                            <th>Station</th>
                            <th>% Available Bikes</th>
                            <th className={this.state.currentStation != "" ? "" : "hideColumn"}>Additional Infos</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.filteredStations.slice(this.state.startIndex, this.state.finishIndex).map(st => (
                        <tr key={st.station_id} 
                            onMouseEnter={() => this.enterHover(st.station_id)} 
                            onMouseLeave={this.exitHover}>
                            <td>{st.name}</td>
                            <td>{ this.state.allStatus.length > 0 ? (this.state.allStatus.filter(stat => st.station_id == stat.station_id)[0].num_bikes_available /st.capacity *100).toFixed(2) : ""} %</td>
                            { st.station_id == this.state.currentStation && <td>
                                Available Docks: {this.state.allStatus.length > 0 ? this.state.allStatus.filter(stat => st.station_id == stat.station_id)[0].num_docks_available: ""}<br/>
                                Total Docks: {st.capacity}<br/>
                                Latitude: {st.lat}<br/>
                                Longitude: {st.lon}<br/>
                                Rental Methods: {st.rental_methods.map((mt,i) => {  
                                const separate = i == st.rental_methods.length-1 ? "":", " 
                                return ( <span key={mt}>{mt} {separate}</span>)
                                })}
                            </td>
                            }

                            {!(st.station_id == this.state.currentStation) && <td className={this.state.currentStation != "" ? "" : "hideColumn"}></td>}
                        
                        </tr>
                        ))}
                    </tbody>
                </table>
        </div>
        );
    }

    getStationsInfos(){
        fetch(stationsInfoUrl)
            .then(results => {return results.json()})
            .then(jsonData => {
                const stationsInfo = jsonData.data.stations
                const currentStatus = this.state.allStatus
                this.updateStatus( stationsInfo, currentStatus)
                this.getAllStationsStatus()
            })
    }

    getAllStationsStatus(){
        fetch(statusUrl)
            .then(results => {return results.json()})
            .then(jsonData => {
                console.log(jsonData)
                const allStatus = jsonData.data.stations
                const stations = this.state.stations
                this.updateStatus( stations, allStatus)
            })
    }

    updateStatus(stations, allStatus){

        const totalPages = (this.state.stations.length/itemsByPage).toFixed(0)
        
        this.setState({
            stations: stations,
            filteredStations: stations,
            allStatus: allStatus,
            currentStation : "",
            startIndex: 0,
            finishIndex: this.state.finishIndex,
            totalPages: totalPages
        })
    }

    enterHover(id){
        const stations = this.state.stations
        const filteredStations = this.state.filteredStations
        const allStatus = this.state.allStatus
        
        this.setState({
            stations: stations,
            filteredStations: filteredStations,
            allStatus: allStatus,
            currentStation : id,
            startIndex:this.state.startIndex,
            finishIndex: this.state.finishIndex,
            totalPages: this.state.totalPages,
        })
    }

    exitHover(){
        const stations = this.state.stations
        const allStatus = this.state.allStatus
        const filteredStations = this.state.filteredStations
        this.setState({
            stations: stations,
            filteredStations: filteredStations,
            allStatus: allStatus,
            currentStation : "",
            startIndex:this.state.startIndex,
            finishIndex: this.state.finishIndex,
            totalPages: this.state.totalPages,
        })
    }

    gotoPage(event){
        const id = parseInt(event.target.value)
        const stations = this.state.stations
        const filteredStations = this.state.filteredStations
        const allStatus = this.state.allStatus

        const startIndex = id * itemsByPage - 1;
        const finishIndex = startIndex + itemsByPage;

        this.setState({
            stations: stations,
            filteredStations: filteredStations,
            allStatus: allStatus,
            currentStation : this.state.currentStation,
            startIndex: startIndex,
            finishIndex: finishIndex,
            totalPages: this.state.totalPages,
        })
    }

    searchStation(event){
        const stationSearch = event.target.value

        const stations = this.state.stations
        const filteredStation = this.state.stations.filter(st => st.name.toLowerCase().includes(stationSearch.toLowerCase()))
        const allStatus = this.state.allStatus
        const totalPages = filteredStation.length / itemsByPage 


        this.setState({
            stations: stations,
            filteredStations: filteredStation,
            allStatus: allStatus,
            currentStation : this.state.currentStation,
            startIndex: 0,
            finishIndex: itemsByPage,
            totalPages: totalPages,
        })
    }
}

export default BikeStationList