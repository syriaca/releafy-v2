import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import {Button} from 'react-bootstrap';


export default class SignUpOrSignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: false};
    
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
      }

    handleClick(e) {
        e.preventDefault();
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    render() {
        const toggleForm = this.state.isToggleOn;
        return (
            <div>
                { toggleForm ? (<SignInForm />):(<SignUpForm />) }
                <Button onClick={this.handleClick} className="btn-default btn" type="submit">
                    {toggleForm ? 'Sign-Up' : 'Sign-In'}
                </Button>   
            </div>
        )        
    }
}