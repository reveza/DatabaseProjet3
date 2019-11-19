import React, { Component } from 'react';
import axios from 'axios';
import JSONPretty from 'react-json-pretty';
var JSONPrettyMon = require('react-json-pretty/dist/monikai');

class DbViewAllTables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTableAnswer: false,
            listTable: []
        }
    }

    handleViewAllTables = (event) => {
        axios.get('/all')
        .then( res => {
            this.setState({listTable: JSON.stringify(res.data)});
            this.setState({listTableAnswer: true});
            console.log(res.data);
        });
    }

    render () {
        return (
            <div>
                <div className="subtitle">List all tables</div>
                <div className="flex">
                    <div className="flex-element">
                        <button onClick={this.handleViewAllTables}>View all</button>
                        {this.state.listTableAnswer &&
                        <div className="json">
                            <JSONPretty theme={JSONPrettyMon} id="json-pretty" data={this.state.listTable}></JSONPretty>
                        </div>}
                    </div>
                </div>
            </div>
        );
        }
}

export default DbViewAllTables;