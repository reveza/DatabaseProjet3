import React, { Component } from 'react';
import axios from 'axios';

class ReturnReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rental_bid: null,
            return_bid: null
        }
    }
    W
    handleSubmitReturn = (event) => {
        axios.post('/returns/daily');
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
                        <p>Returns</p>
                        <button onClick={this.handleSubmitReturn}>Generate</button>
                    </div>
                </div>
            </div>
        );
        }
}

export default ReturnReport;
