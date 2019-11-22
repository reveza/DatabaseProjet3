import React, { Component } from 'react';
import axios from 'axios';

class RentalBranchReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rental_bid: null,
            return_bid: null
        }
    }

    handleSubmitRentalBranch = (event) => {
        event.preventDefault();
        const data = this.state.rental_bid;
        axios.post('/rentals/branch', data);
    }

    handleInputChange = (event) => {    
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render () {
        return (
            <div>
                <div className="flex-element">
                    <p>Rentals per Branch</p>
                    <input type='text' placeholder='Branch ID' name='rental_bid' onChange={this.handleInputChange}/>
                    <button onClick={this.handleSubmitRentalBranch}>Generate</button>
                </div>
            </div>
        );
        }
}

export default RentalBranchReport;
