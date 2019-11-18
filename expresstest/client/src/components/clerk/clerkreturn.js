import React, { Component } from 'react';
import axios from 'axios';

class ClerkReturn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rid: null,
            date: null,
            time: null,
            odometer: null,
            fullTank: null,
            value: null,
            error: "no err",
            showError: false,
            closed: true
        }
        this.handleClose = this.handleClose.bind(this);
    }

    handleSubmit = (event) => {
        this.setState({error: "no err"});
        event.preventDefault();
        const data = this.state;
        axios.post('/returns', data,
        // {
        //     headers : {
        //       'Content-Type': 'application/json',
        //       'Accept': 'application/json'
        //     }
          // }
        )
        .then( res => {
            console.log(res);
            this.setState({error: res.data});
            this.setState({showError: true});
        });
        this.setState({closed: false});
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleClose() {
        this.setState({showError: false});
        this.setState({closed: true})
    }

    render () {
        const showError = this.state.showError;
        const closed = this.state.closed;
        return (
            <div>
                <h5>Return a vehicle</h5>
                <form onSubmit={this.handleSubmit}>
                    {!closed && showError && <div>{this.state.error} <button onClick={this.handleClose}>X</button></div>}
                    {!closed && !showError &&
                    <div>Return was made for RentId {this.state.rid}, Date {this.state.date}, Time {this.state.time},
                    Odometer {this.state.odometer}, FullTank {this.state.fullTank} and Value {this.state.value}
                    <button onClick={this.handleClose}>X</button></div>}
                    <p><input type='text' placeholder='Rent ID' name='rid' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='Date DD/MM/YYY' name='date' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='Time HH/MM' name='time' onChange={this.handleInputChange}/></p>
                    <p><input type='text' placeholder='Odometer' name='odometer' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='fullTank' name='fullTank' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='Value' name='value' onChange={this.handleInputChange}/></p>
                    <p><button>Return Vehicle</button></p>
                </form>
            </div>
        );
        }
}

export default ClerkReturn;
