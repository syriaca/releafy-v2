import React, { Component } from 'react';
import axios from 'axios';
import {FormGroup, FormControl, Button, ControlLabel} from 'react-bootstrap';

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
        if(this.state.user.username == "" || this.state.user.password == "") {
            event.preventDefault();
        } else {
            axios.post('/api/users', this.state.user)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            event.preventDefault();
            this.props.handleLogin(this.state.user.username)
            this.setState({
                isLogged: true,
                username: this.state.user.username
            })
        }
    };
    
    render(){
        return(
            <form id="signUpForm" method="POST" className="signup-form" onSubmit={this.handleSubmit}>
                <FormGroup controlId="username">
                    <ControlLabel>Enter a username</ControlLabel>
                    <FormControl name="username" type="text" value={this.state.username} onChange={this.handleInputChange} placeholder="Choose a beautiful username" required/>
                </FormGroup>
                <FormGroup controlId="password">
                    <ControlLabel>Enter a password</ControlLabel>
                    <FormControl name="password" type="password" value={this.state.password} onChange={this.handleInputChange} placeholder="Choose a strong password" required/>
                </FormGroup>
                <Button bsStyle="default" bsSize="large" type="submit" block>
                    Sign Up
                </Button>
            </form>
        );
    };
};