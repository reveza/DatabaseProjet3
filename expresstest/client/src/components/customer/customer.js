import React, { Component } from 'react';
import './customer.css';

class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        }
    }

    getResponse = async() => {
        const response = await fetch('http://localhost:5000/users');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    }

    componentDidMount() {
        this.getResponse()
        .then( res => {
            const customers = res;
            this.setState({customers}, () => console.log(customers));
        })
    }

    render () {
        return (
            <div>
                <h2>{this.state.customers}</h2>
            </div>
        );
        }
}

export default Customer;
