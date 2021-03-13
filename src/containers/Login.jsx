import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../containerStyles/Login.css";

import axios from 'axios';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setEmail(enteredEmail){
        this.setState({
            username: enteredEmail
        });
        console.log(this.state.username);
    }

    setPassword(enteredPassword){
        this.setState({
            password: enteredPassword
        });
    }

    handleSubmit(event){
        if(this.validateForm()){
            console.log("submit");
            axios.post('/login', {
                username: this.state.username,
                password: this.state.password
            }).then(
                (response) => {
                  window.location="/users";
                },
                (error) => {
                  console.log(error);
                }
            );
        }  else {
            console.log("error");
        }
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
      }

    render(){
        return (
            <div className="Login">
              <Form >
                <Form.Group size="sm" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    autoFocus
                    type="email"
                    value={this.state.username}
                    onChange={(e) => this.setState(this.setEmail(e.target.value))}
                    // onChange={(e) => this.setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group size="sm" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={this.state.password}
                    onChange={(e) => this.setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button block size="sm" type="button" onClick={this.handleSubmit} >
                  Login
                </Button>
              </Form>
            </div>
          );
    }
}

export default Login;