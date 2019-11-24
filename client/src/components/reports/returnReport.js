import React, { Component } from 'react';
import axios from 'axios';

class ReturnReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report_info: false,
            report_category: false,
            report_branch: false,
            report_new: false,
            info: null,
            category: null,
            branch: null,
            new: null
        }
    }
    W
    handleSubmitReturn = (event) => {
        axios.post('/returns/daily/info')
        .then(res => {
            this.setState({report_info: true});
            this.setState({info: JSON.stringify(res.data)});
        });
        axios.post('/returns/daily/category')
        .then(res => {
            this.setState({report_category: true});
            this.setState({category: JSON.stringify(res.data)});
        });
        axios.post('/returns/daily/branch')
        .then(res => {
            this.setState({report_branch: true});
            this.setState({branch: JSON.stringify(res.data)});
        });
        axios.post('/returns/daily/new')
        .then(res => {
            this.setState({report_new: true});
            this.setState({new: JSON.stringify(res.data)});
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
