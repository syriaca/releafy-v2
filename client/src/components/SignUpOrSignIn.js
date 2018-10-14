import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import {Button} from 'react-bootstrap';
import { withCookies, Cookies } from 'react-cookie';


export default class SignUpOrSignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false
        };
    
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
                { toggleForm ? (<SignUpForm handleLoggedStatus={this.props.handleLoggedStatus}/>):(<SignInForm handleLoggedStatus={this.props.handleLoggedStatus}/>) }
                <Button onClick={this.handleClick} className="btn-default btn" type="submit">
                    {toggleForm ? 'Sign-In' : 'Sign-Up'}
                </Button>   
            </div>
        )        
    }
}