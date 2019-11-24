import React, { Component } from 'react';
import axios from 'axios';
import JSONPretty from 'react-json-pretty';
var JSONPrettyMon = require('react-json-pretty/dist/monikai');


class DbViewOneTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableResponse: false,
            tableName: "",
            table: [],
        }
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleViewOneTable = (event) => {
        let url_table = '/' + this.state.tableName;
        axios.get(url_table)
        .then( res => {
            this.setState({table: JSON.stringify(res.data, null, 4)});
            this.setState({tableResponse: true});
        });
    }

    render () {
        return (
            <div>
                <div className="subtitle">View one table:</div>
                <div className="flex">
                    <div className="flex-element">
                        <input type='text' placeholder='Table Name' name='tableName' onChange={this.handleInputChange}/>
                        <button onClick={this.handleViewOneTable}>View</button>
                        {this.state.tableResponse && <div className="json">
                            <JSONPretty theme={JSONPrettyMon} id="json-pretty" data={this.state.table}></JSONPretty>
                        </div>}
                    </div>
                </div>
            </div>
        );
        }
}

export default DbViewOneTable;