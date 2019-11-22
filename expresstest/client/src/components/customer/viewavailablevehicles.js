import React, { Component } from 'react';
import axios from 'axios';
import JSONPretty from 'react-json-pretty';
var JSONPrettyMon = require('react-json-pretty/dist/monikai');

class ViewAvailableVehicles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vid: null,
            vlicense: null,
            make: null,
            model: null,
            year: null,
            color: null,
            odometer: null,
            status: null,
            vtname: null,
            location: null,
            city: null,
            vehicle_query: false,
            vehicle_number: null,
            listTableAnswer: false,
            listTable: []
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = this.state;
        axios.post('/vehicle/available', data)
        .then( res => {
            this.setState({vehicle_query: true});
            this.setState({vehicle_number: res.data});
        })
    }

    handleViewVehicles = (event) => {
      event.preventDefault();
      const data = this.state;
      axios.post('/vehicle/view_available', data)
      .then( res => {
        this.setState({listTable: JSON.stringify(res.data)});
        this.setState({listTableAnswer: true});
        console.log(res.data);
      })
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render () {
        return (
            <div>
                <h5>View available vehicles</h5>
                <form onSubmit={this.handleSubmit}>
                    <p><input type='text' placeholder='Car Type' name='vtname' onChange={this.handleInputChange}/></p>
                    <p><input type='text' placeholder='Location' name='location' onChange={this.handleInputChange}/></p>
                    <p><input type='text' placeholder='From Date YYYY-MM-DD' name='fromDate' onChange={this.handleInputChange}/></p>
                    <p><input type='text' placeholder='To Date YYYY-MM-DD' name='toDate' onChange={this.handleInputChange}/></p>
                    <p><button>View number of available vehicles</button></p>
                    {this.state.vehicle_query && <div>
                      Vehicle number: {this.state.vehicle_number}
                      <p><button onClick={this.handleViewVehicles}>View available vehicles here</button></p>
                    </div>}
                    {this.state.listTableAnswer &&
                    <div className="json">
                        <JSONPretty theme={JSONPrettyMon} id="json-pretty" data={this.state.listTable}></JSONPretty>
                    </div>}
                    </form>
            </div>
        );
        }
}

export default ViewAvailableVehicles;
