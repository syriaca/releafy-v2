import React, { Component } from 'react';
import axios from 'axios';
import {FormGroup, FormControl, Button, ControlLabel} from 'react-bootstrap';

export default class SignUpForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    };
    
    handleSubmit(event) {
        alert('Your username is: ' + this.state.username + ',' + ' Your password is: ' + this.state.password);
        event.preventDefault();
        axios.post('/', {
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            console.log(response.data);
            if (response.data) {
                console.log('successful signup');
            } else {
                console.log('sign-up error');
            }
        }).catch(error => {
            console.log(error);
        })
    };
    
    render(){
        return(
            <form id="signUpForm" method="POST" className="signup-form form-inline" onSubmit={this.handleSubmit}>
                <FormGroup controlId="username">
                    <ControlLabel>Enter a username</ControlLabel>
                    <FormControl name="username" type="text" value={this.state.username} onChange={this.handleInputChange} placeholder="Choose a beautiful username" />
                </FormGroup>
                <FormGroup controlId="password">
                    <ControlLabel>Enter a password</ControlLabel>
                    <FormControl name="password" type="password" value={this.state.password} onChange={this.handleInputChange} placeholder="Choose a strong password" />
                </FormGroup>
                <Button bsStyle="primary" bsSize="large" type="submit" block>
                    Sign Up
                </Button>
            </form>
        );
    };
};