import React, { Component } from 'react';
import axios from 'axios';

class DbAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableName: "",
            columns: null,
            values: null
        }
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleViewOneTable = (event) => {
        const data = this.state;
        axios.post('all/insert', data);
    }

    render () {
        return (
            <div>
                <div className="subtitle">Add entire row to a table:</div>
                <div className="flex">
                    <div className="flex-element">
                        <p className="text">
                            Enter table name
                            <input type='text' placeholder='Table Name' name='tableName' onChange={this.handleInputChange}/>
                        </p>
                    </div>
                    <div className="flex-element">
                        <p className="text">
                            EX: (rid, vid, ...)
                            <input type='text' placeholder='(columns)' name='columns' onChange={this.handleInputChange}/>
                        </p>
                    </div>
                    <div className="flex-element">
                        <p className="text">
                            EX: (2, 3)
                            <input type='text' placeholder='(values)' name='values' onChange={this.handleInputChange}/>
                        </p>
                    </div>
                    <div className="flex-element">
                        <button onClick={this.handleViewOneTable}>Add row</button>
                    </div>
                </div>
            </div>
        );
        }
}

export default DbAdd;