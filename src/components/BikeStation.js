import React, { Component } from 'react'

class BikeStation extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
       return(this.props.stations.map(st => 
            (
                <tr key={st.station_id}>

                </tr>
            )
        ));
    }
}

export default BikeStation