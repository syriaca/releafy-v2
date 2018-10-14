import React, { Component } from 'react';
import axios from 'axios';
import {FormGroup, FormControl, Button, ControlLabel} from 'react-bootstrap';
import { withCookies, Cookies } from 'react-cookie';

export default class SignUpForm extends Component {

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
        axios.post('/api/users', this.state.user)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        event.preventDefault();
        this.props.handleLoggedStatus(this.state.user.username)
        this.setState({
            isLoggedIn: true,
            username: this.state.user.username
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