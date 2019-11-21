import React, { Component } from 'react';
import axios from 'axios';

class DbUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableName: "",
            update: null,
            primary_key: null
        }
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleViewOneTable = (event) => {
        const data = this.state;
        axios.post('all/update', data);
    }

    render () {
        return (
            <div>
                <div className="subtitle">Update field in one table:</div>
                <div className="flex">
                    <div className="flex-element">
                        <p className="text">
                            Enter table name
                            <input type='text' placeholder='Table Name' name='tableName' onChange={this.handleInputChange}/>
                        </p>
                    </div>
                    <div className="flex-element">
                        <p className="text">
                            primary_key = value
                            <input type='text' placeholder='primaryKey' name='primary_key' onChange={this.handleInputChange}/>
                        </p>
                    </div>
                    <div className="flex-element">
                        <p className="text">
                            column_name = "updated_value"
                            <input type='text' placeholder='update column' name='update' onChange={this.handleInputChange}/>
                        </p>
                    </div>
                    <div className="flex-element">
                        <button onClick={this.handleViewOneTable}>Update Field</button>
                    </div>
                </div>
            </div>
        );
        }
}

export default DbUpdate;