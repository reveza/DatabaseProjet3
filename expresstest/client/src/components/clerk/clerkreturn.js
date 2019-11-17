import React, { Component } from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";

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
            open: true
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleSubmit = (event) => {
        this.state.error = "no err";
        event.preventDefault();
        const data = this.state;
        axios.post('/returns', data, {
            headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }})
        .then( res => {
            console.log(res);
            this.setState({error: res.data});
            this.setState({showError: true});
        });
    }

    handleInputChange = (event) => {    
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOpen() {
        this.setState({open: true});
    }
    
    handleClose() {
        this.setState({open: false});
        this.setState({showError: false});
    }

    render () {
        const showError = this.state.showError;
        return (
            <div>
                <h5>Return a vehicle</h5>
                <form onSubmit={this.handleSubmit}>
                    {showError && <div>{this.state.error} <button onClick={this.handleClose}>X</button></div>} 
                    <p><input type='text' placeholder='Rent ID' name='rid' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='Date' name='date' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='Time' name='time' onChange={this.handleInputChange}/></p>
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
