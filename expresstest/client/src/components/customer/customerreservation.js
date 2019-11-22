import React, { Component } from 'react';
import axios from 'axios';

class CustomerReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confNo:null,
            name: null,
            vid: null,
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
            k: 0,
            carAvailable: true,
            showTicket:false
        }
        this.handleClose = this.handleClose.bind(this);
    }

    handleSubmit = (event) => {
        this.setState({error: "no err"});
        event.preventDefault();
        const data = this.state;
        axios.post('/reservation/checkAvailibility', data).then(res=>{
          if (res.data === "Available") {
            axios.post('/customer/check', data)
            .then( res => {
              if (res.data !=="exists" && this.state.k === 0){
                this.setState({customerExists:false});
                this.setState({k:1});
              } else {
                axios.post('/reservation/test', data)
                .then(res=> {
                  if(res.data.confNo !== null) {
                    this.setState({confNo:res.data.confNo});
                    this.setState({showTicket: true});
                    this.setState({closed:false});

                    this.setState({carAvailable:true});
                  }
                });
              }
            });
            if (this.state.k === 1 && (!this.state.customerExists) && this.state.carAvailable) {
              axios.post('/customer/test', data);
              axios.post('/reservation/test', data)
              .then(res=> {
                if(res.data.confNo !== null) {
                  this.setState({confNo:res.data.confNo});
                  this.setState({showTicket: true});
                  this.setState({closed:false});
                  this.setState({carAvailable:true});
                }
              });
              this.setState({k:0});
            }
          } else {
            this.setState({carAvailable:false});
            this.setState({closed:false});
          }
        });
      }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleClose() {
        this.setState({showError: false});
        this.setState({closed: true});
        this.setState({showTicket: false});
        this.setState({carAvailable:true});
    }

    render () {
        const showTicket = this.state.showTicket;
        const showError = this.state.showError;
        const closed = this.state.closed;
        return (
            <div>
                <h5>Reserve a vehicle</h5>
                <form onSubmit={this.handleSubmit}>
                    {!closed && showError && <div>{this.state.error} <button onClick={this.handleClose}>X</button></div>}
                    {!closed && showTicket &&
                    <div>Confirmation Number is {this.state.confNo}
                    <button onClick={this.handleClose}>X</button>
                    </div>}
                    <p><input type='text' placeholder='Name' name='name' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='Cellphone' name='cellphone' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='Vechicle ID' name='vid' onChange={this.handleInputChange}/></p>

                    <p><input type='text' placeholder='From Time' name='fromTime' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='From Date' name='fromDate' onChange={this.handleInputChange}/></p>

                    <p><input type='text' placeholder='To Time' name='toTime' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='To Date' name='toDate' onChange={this.handleInputChange}/></p>
                    {!this.state.carAvailable && <div>
                      This car is not available. Please choose another vehicle.</div>}
                    {!closed && !this.state.customerExists && this.state.carAvailable && <div>
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
