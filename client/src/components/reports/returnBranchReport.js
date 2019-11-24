import React, { Component } from 'react';
import axios from 'axios';

class ReturnBranchReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rental_bid: null,
            return_bid: null
        }
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
                <div className="flex">
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

export default ReturnBranchReport;
