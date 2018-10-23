import React, { Component } from 'react';
import {Form, FormGroup, FormControl, Button} from 'react-bootstrap';

export default class SearchForm extends Component {

  onSearchChange = e => {
    this.setState({ searchText: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.state.searchText);
  }

  render() {
    return(
      <Form inline className="form-search" onSubmit={this.handleSubmit}>
          <FormGroup controlId="formInlineName">
            <FormControl onChange={this.onSearchChange} type="text" placeholder="Search something there" required/>
          </FormGroup>
          <Button className="btn-generate" type="submit">Search !</Button>
        </Form> 
      );    
  }
};