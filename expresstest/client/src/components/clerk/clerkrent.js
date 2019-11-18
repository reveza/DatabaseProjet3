import React, { Component } from 'react';
import axios from 'axios';

class ClerkRent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rid: null,
            vid: null,
            cellphone: null,
            fromDate: null,
            fromTime: null,
            toDate: null,
            toTime: null,
            odometer: null,
            cardName: null,
            cardNo: null,
            expDate: null,
            confNo: null
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = this.state;
        axios.post('/rentals', data,
        // {
        //     headers : {
        //       'Content-Type': 'application/json',
        //       'Accept': 'application/json'
        //     }
          // }
        )
        .then( res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
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
                <h5>Rent a vehicle</h5>
                <form onSubmit={this.handleSubmit}>
                    <p><input type='text' placeholder='Reservation ID' name='rid' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='Vehicle ID' name='vid' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='Cellphone' name='cellphone' onChange={this.handleInputChange}/></p>
                    <p><input type='text' placeholder='fromDate DD/MM/YYYY' name='fromDate' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='fromTime HH/MM' name='fromTime' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='toDate DD/MM/YYYY' name='toDate' onChange={this.handleInputChange}/></p>
                    <p><input type='text' placeholder='toTime HH/MM' name='toTime' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='Odometer' name='odometer' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='cardName' name='cardName' onChange={this.handleInputChange}/></p>
                    <p><input type='text' placeholder='CardNumber' name='cardNo' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='ExpDate' name='expDate' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='Confirmation Number' name='confNo' onChange={this.handleInputChange}/></p>
                    <p><button>Rent Vehicle</button></p>
                </form>
            </div>
        );
        }
}

export default ClerkRent;
