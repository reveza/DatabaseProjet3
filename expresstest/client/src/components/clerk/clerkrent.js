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
            confNo: null,
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
        axios.post('/rentals', data)
        .then( res => {
            this.setState({error: res.data});
            this.setState({showError: true});
        })
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
                <h5>Rent a vehicle</h5>
                <form onSubmit={this.handleSubmit}>
                    {!closed && showError && <div>{this.state.error} <button onClick={this.handleClose}>X</button></div>}
                    {!closed && !showError &&
                    <div>
                        Rental was made for RentId {this.state.rid}, Vid {this.state.vid}, Cellphone {this.state.cellphone},
                        From Date {this.state.fromDate}, fromTime {this.state.fromTime}, toDate {this.state.toDate}, 
                        toTime {this.state.toTime}, Odometer {this.state.odometer}, CardName {this.state.cardName},
                        cardNo {this.state.cardNo}, ExpDate {this.state.expDate}, confNo {this.state.confNo}
                        <button onClick={this.handleClose}>X</button>
                    </div>}
                    <p><input type='text' placeholder='Vehicle ID' name='vid' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='Cellphone' name='cellphone' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='fromDate DD/MM/YYYY' name='fromDate' onChange={this.handleInputChange}/></p>
                    <p><input type='text' placeholder='fromTime HH/MM' name='fromTime' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='toDate DD/MM/YYYY' name='toDate' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='toTime HH/MM' name='toTime' onChange={this.handleInputChange}/></p>
                    <p><input type='text' placeholder='Odometer' name='odometer' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='cardName' name='cardName' onChange={this.handleInputChange}/>
                    <input type='text' placeholder='CardNumber' name='cardNo' onChange={this.handleInputChange}/></p>
                    <input type='text' placeholder='ExpDate' name='expDate' onChange={this.handleInputChange}/>
                    <p><input type='text' placeholder='Confirmation Number' name='confNo' onChange={this.handleInputChange}/></p>
                    <p><button>Rent Vehicle</button></p>
                </form>
            </div>
        );
        }
}

export default ClerkRent;
