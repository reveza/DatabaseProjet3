import React, { Component } from 'react';
import axios from 'axios';
import JSONPretty from 'react-json-pretty';
var JSONPrettyMon = require('react-json-pretty/dist/monikai');

class RentalReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report_info: false,
            report_category: false,
            report_branch: false,
            report_new: false,
            info: null,
            category: null,
            branch: null,
            new: null
        }
    }

    handleSubmitRental = (event) => {
        axios.post('/rentals/daily/information')
        .then(res => {
            this.setState({report_info: true});
            this.setState({info: JSON.stringify(res.data)});
        });
        axios.post('/rentals/daily/category')
        .then(res => {
            this.setState({report_category: true});
            this.setState({category: JSON.stringify(res.data)});
        });
        axios.post('/rentals/daily/branch')
        .then(res => {
            this.setState({report_branch: true});
            this.setState({branch: JSON.stringify(res.data)});
        });
        axios.post('/rentals/daily/new')
        .then(res => {
            this.setState({report_new: true});
            this.setState({new: JSON.stringify(res.data)});
        });
    }

    handleInputChange = (event) => {    
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render () {
        return (
            <div>
                <div className="flex">
                    <div className="flex-element">
                        Rentals
                    </div>
                    <div className="flex-element">
                        <button onClick={this.handleSubmitRental}>Generate</button>
                    </div>
                    {this.state.report_info && 
                        <div className="json">
                            Vehicle information: 
                            <JSONPretty theme={JSONPrettyMon} id="json-pretty" data={this.state.info}></JSONPretty>
                        </div>
                    }
                    {this.state.report_category &&
                        <div className="json">
                            Vehicle rented per category: 
                            <JSONPretty theme={JSONPrettyMon} id="json-pretty" data={this.state.category}></JSONPretty>
                        </div>
                    }
                    {this.state.report_branch &&
                        <div className="json">
                            Number of rentals per branch: 
                            <JSONPretty theme={JSONPrettyMon} id="json-pretty" data={this.state.branch}></JSONPretty>
                        </div>
                    }
                    {this.state.report_new &&
                        <div className="json">
                            New rentals for today:
                            <JSONPretty theme={JSONPrettyMon} id="json-pretty" data={this.state.new}></JSONPretty>
                        </div>
                    }
                </div>
            </div>
        );
        }
}

export default RentalReport;
