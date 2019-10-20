import React, { Component } from 'react'
import Config from '../../config/Config.json'
import axios from 'axios';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';

export default class Signup extends Component {

    state = {
        username: '',
        password: '',
        email: '',
        confirmPassword: '',
        message: {}
    }

    signup = (e) => {

        e.preventDefault();

        this.setState({
            message: {}
        })

        if(this.state.password != this.state.confirmPassword) {
            this.setState({
                message: {type: 'error', content: 'Password mismatch, please check'}
            })

            return;
        }

        axios.post(Config.baseUrl + "/register/", {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        })
            .then((response) => {
                console.log('success')
                const message = response.data && response.data.saveStatus == "success"
                                ? {type: 'info', content: "Account created, please login to continue" }
                                : {type: 'error', content: response.data.message};
                this.setState({
                    message: message
                })

                if(response.data && response.data.saveStatus == "success") {

                    this.setState({
                            username: '',
                            password: '',
                            email: '',
                            confirmPassword: '',
                        })
                }
            })

    }

    render() {

        return (

            <div className="container signup-container">
                <h1 className="header">Signup</h1>
                {Object.keys(this.state.message).length > 0 &&
                    <div className={"message-box " +  (this.state.message.type == "info" && "info") }>{this.state.message.content}</div>
                }
                <div className="form-container">
                    <form onSubmit={this.signup}>
                        <div className="input-container">
                            <input 
                                placeholder="Username"
                                type="text"
                                value={this.state.username}
                                onChange={(e) => this.setState({ username: e.target.value })}
                            />
                        </div>
                        <div className="input-container">
                            <input 
                                placeholder="Email"
                                type="email"
                                value={this.state.email}
                                onChange={(e) => this.setState({ email: e.target.value })}
                            />
                        </div>
                        <div className="input-container">
                            <input 
                                placeholder="Password" 
                                type="password"
                                value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                            />
                        </div>
                        <div className="input-container">
                            <input 
                                placeholder="Confirm Password"
                                type="password"
                                value={this.state.confirmPassword}
                                onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                            />
                        </div>
                        <div className="button-container">
                            <input type="submit" value="Signup" />
                        </div>
                    </form>
                    <div className="form-bottom">
                        <h3>Allready have an account.</h3>
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        )
    }
}