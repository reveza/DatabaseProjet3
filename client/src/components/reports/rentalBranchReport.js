import React, { Component } from 'react';
import axios from 'axios';
import JSONPretty from 'react-json-pretty';
var JSONPrettyMon = require('react-json-pretty/dist/monikai');

class RentalBranchReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            info_status: false,
            info: null,
            category_status: false,
            category: null,
            branch_status: false,
            branch: null,
            new_status: false,
            new: null,
        }
    }

    handleInputChange = (event) => {    
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmitRentalBranch = (event) => {
        const data = this.state;
        event.preventDefault();
        axios.post('/rentals/branch/info', data)
        .then( res => {
            this.setState({info_status: true});
            this.setState({info: res.data});
        });
        axios.post('/rentals/branch/category', data)
        .then( res => {
            this.setState({category_status: true});
            this.setState({category: res.data});
        });
        axios.post('/rentals/branch/branch', data)
        .then(res => {
            this.setState({branch_status: true});
            this.setState({branch: JSON.stringify(res.data)});
        });
        axios.post('/rentals/branch/new', data)
        .then(res => {
            this.setState({new_status: true});
            this.setState({new: JSON.stringify(res.data)});
        });
    }

    render () {
        return (
            <div>
                <div className="flex-element">
                    <p>Rentals per Branch</p>
                    <input type='text' placeholder='Location name' name='name' onChange={this.handleInputChange}/>
                    <button onClick={this.handleSubmitRentalBranch}>Generate</button>
                </div>
                {this.state.info_status &&
                        <div className="json">
                            Vehicle information in {this.state.name}: 
                            <JSONPretty theme={JSONPrettyMon} id="json-pretty" data={this.state.info}></JSONPretty>
                        </div>
                    }
                {this.state.category_status &&
                    <div className="json">
                        Vehicle rented per category in {this.state.name}: 
                        <JSONPretty theme={JSONPrettyMon} id="json-pretty" data={this.state.category}></JSONPretty>
                    </div>
                }
                {this.state.branch_status &&
                        <div className="json">
                            Number of rentals per branch in {this.state.name}: 
                            <JSONPretty theme={JSONPrettyMon} id="json-pretty" data={this.state.branch}></JSONPretty>
                        </div>
                    }
                {this.state.new_status &&
                    <div className="json">
                        New rentals for today in {this.state.name}:
                        <JSONPretty theme={JSONPrettyMon} id="json-pretty" data={this.state.new}></JSONPretty>
                    </div>
                }
        </div>
        );
        }
}

export default RentalBranchReport;
