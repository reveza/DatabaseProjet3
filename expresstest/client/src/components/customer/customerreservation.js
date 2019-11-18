import React, { Component } from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";

class CustomerReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            vtname: null,
            cellphone: null,
            fromTime: null,
            fromDate: null,
            toTime: null,
            toDate: null,
            error: "no err",
            showError: false,
            closed: true
        }
        this.handleClose = this.handleClose.bind(this);
    }

    handleSubmit = (event) => {
        this.state.error = "no err";
        event.preventDefault();
        const data = this.state;
        axios.post('/reservation', data, {
            headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }})
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
                <h5>Reserve a vehicle</h5>
                <form onSubmit={this.handleSubmit}>
                    {!closed && showError && <div>{this.state.error} <button onClick={this.handleClose}>X</button></div>}
                    {!closed && !showError &&
                    <div>Customer ({this.state.name, this.state.cellphone}) made a reservation
                    <button onClick={this.handleClose}>X</button></div>}
                    <p><input type='text' placeholder='Name' name='name' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='Cellphone' name='cellphone' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='Vechicle Type' name='vtname' onChange={this.handleInputChange}/></p>

                    <p><input type='text' placeholder='From Time' name='fromTime' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='From Date' name='fromDate' onChange={this.handleInputChange}/></p>

                    <p><input type='text' placeholder='To Time' name='fromTime' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='To Date' name='fromDate' onChange={this.handleInputChange}/></p>
                    <p><button>Make a reservation</button></p>
                </form>
            </div>
        );
        }
}

export default CustomerReservation;
