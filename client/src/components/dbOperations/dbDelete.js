import React, { Component } from 'react';
import axios from 'axios';

class DbDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableName: "",
            delete: null
        }
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleViewOneTable = (event) => {
        const data = this.state;
        axios.post('all/delete', data);
    }

    render () {
        return (
            <div>
                <div className="subtitle">Delete Element in One Table:</div>
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
                            <input type='text' placeholder='primaryKey' name='delete' onChange={this.handleInputChange}/>
                        </p>
                    </div>
                    <div className="flex-element">
                        <button onClick={this.handleViewOneTable}>Delete</button>
                    </div>
                </div>
            </div>
        );
        }
}

export default DbDelete;