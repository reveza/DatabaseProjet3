import React, { Component } from 'react';
import axios from 'axios';

class DailyReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rental_bid: null,
            return_bid: null
        }
    }

    handleSubmitRental = (event) => {
        axios.post('/rentals/daily', {
            headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }});
    }

    handleSubmitReturn = (event) => {
        axios.post('/returns/daily');
    }

    handleSubmitRentalBranch = (event) => {
        event.preventDefault();
        const data = this.state.rental_bid;
        axios.post('/rentals/branch', data);
    }

    handleSubmitReturnBranch = (event) => {
        event.preventDefault();
        const data = this.state.return_bid;
        axios.post('/returns/branch', data);
    }

    handleInputChange = (event) => {    
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render () {
        return (
            <div>
                <h5>Daily Reports</h5>
                <div className="flex">
                    <div className="flex-element">
                        <p>Rentals</p>
                        <button onClick={this.handleSubmitRental}>Generate</button>
                    </div>
                    <div className="flex-element">
                        <p>Rentals per Branch</p>
                        <input type='text' placeholder='Branch ID' name='rental_bid' onChange={this.handleInputChange}/>
                        <button onClick={this.handleSubmitRentalBranch}>Generate</button>
                    </div>
                    <div className="flex-element">
                        <p>Returns</p>
                        <button onClick={this.handleSubmitReturn}>Generate</button>
                    </div>
                    <div className="flex-element">
                        <p>Returns per Branch</p>
                        <input type='text' placeholder='Branch ID' name='return_bid' onChange={this.handleInputChange}/>
                        <button onClick={this.handleSubmitReturnBranch}>Generate</button>
                    </div>
                </div>
            </div>
        );
        }
}

export default DailyReport;
