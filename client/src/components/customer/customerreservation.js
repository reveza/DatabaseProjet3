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
            carAvailable: null,
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
          this.setState({carAvailable:true}, () => {
            this.forceUpdate();
          });
        } else {
          this.setState({carAvailable:false}, () => {
            this.forceUpdate();
          });
        };
        axios.post('/customer/check', data).then( res => {
          if (res.data === "exists") {
            this.setState({customerExists:true, k:2}, () => {
              this.forceUpdate();
            });
          } else {
            this.setState({customerExists:false, k:1}, () => {
              this.forceUpdate();
            });
          }
          if (this.state.carAvailable && this.state.k === 1 && this.state.address !== null && this.state.dlicense !== null) {
            axios.post('/customer/test', data);
            this.setState({k:2}, () => {
              this.forceUpdate();
            });
          };
          if (this.state.carAvailable && this.state.k === 2) {
            axios.post('/reservation/test', data).then(res=>{
              if (res.data.confNo !== null) {
                this.setState({confNo:res.data.confNo, showTicket:true, closed:false, showError:false});
              } else {
                this.setState({error:res.data.error, showError:true, closed:false}, () => {
                  this.forceUpdate();
                } );

              }
            })
          };
        });
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
                    {!closed && showError && <div>Invalid Car ID <button onClick={this.handleClose}>X</button></div>}
                    {!closed && showTicket && !showError &&
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
                    {(this.state.carAvailable === false) && <div>
                      This car is not available. Please choose another vehicle.</div>}
                    {!this.state.customerExists && this.state.carAvailable && <div>
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
