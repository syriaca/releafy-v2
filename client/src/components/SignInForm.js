import React, { Component } from 'react';
import axios from 'axios';
import {FormGroup, FormControl, Button, ControlLabel} from 'react-bootstrap';

export default class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user:{
                username: '',
                password: ''
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleInputChange(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    };

    handleSubmit(event) {
        event.preventDefault();
    };

    render() {
        return(
            <form id="signInForm" className="signin-form form-inline" onSubmit={this.handleSubmit}>
                <FormGroup controlId="username">
                    <ControlLabel>Type your username</ControlLabel>
                    <FormControl name="username" value={this.state.username} onChange={this.handleInputChange} type="text" placeholder="Enter your beautiful username" />
                </FormGroup>
                <FormGroup controlId="password">
                    <ControlLabel>Type your password</ControlLabel>
                    <FormControl name="password" value={this.state.password} onChange={this.handleInputChange} type="password" placeholder="Enter your strong password" />
                </FormGroup>
                <Button type="submit" bsStyle="primary" bsSize="large" block>
                    Sign in
                </Button>
            </form>
        );
    };
};