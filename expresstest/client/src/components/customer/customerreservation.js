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
            address: null,
            dlicense: null,
            error: "no err",
            showError: false,
            closed: true,
            customerExists: true,
            k: 0
        }
        this.handleClose = this.handleClose.bind(this);
    }

    handleSubmit = (event) => {
        this.state.error = "no err";
        event.preventDefault();
        const data = this.state;
        axios.post('/customer/check', data)
        .then( res => {
          if (res.data !=="exists" && this.state.k == 0){
            this.setState({customerExists:false});
            this.setState({k:1});
          } else {
            axios.post('/reservation/test', data);
          }
        });

        if (this.state.k == 1 && (!this.state.customerExists)) {
          axios.post('/customer/test', data);
          axios.post('/reservation/test', data);
          this.setState({k:0});
        };
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
                    <div>Customer ({this.state.name}, {this.state.cellphone}) made a reservation
                    <button onClick={this.handleClose}>X</button></div>}
                    <p><input type='text' placeholder='Name' name='name' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='Cellphone' name='cellphone' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='Vechicle Type' name='vtname' onChange={this.handleInputChange}/></p>

                    <p><input type='text' placeholder='From Time' name='fromTime' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='From Date' name='fromDate' onChange={this.handleInputChange}/></p>

                    <p><input type='text' placeholder='To Time' name='toTime' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='To Date' name='toDate' onChange={this.handleInputChange}/></p>
                    {!this.state.customerExists && <div>
                      Customer does not exist. Please input information
                      <p><input type='text' placeholder='Address' name='address' onChange={this.handleInputChange}/>
                      <input type='text' placeholder='Driving License' name='dlicense' onChange={this.handleInputChange}/></p>
                      </div>
                    }
                    <p><button>Make a reservation</button></p>
                </form>
            </div>
        );
        }
}

export default CustomerReservation;
