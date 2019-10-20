import React, { Component } from 'react'
import Config from '../../config/Config.json'
import axios from 'axios';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';

class Login extends Component {

    state = {
        username: '',
        password: '',
        message: ''
    }

    authenticate = (e) => {

        e.preventDefault();

        this.setState({
            message: ''
        })

        axios.post(Config.baseUrl + "/auth/", {
            username: this.state.username,
            password: this.state.password
        })
            .then((response) => {
                console.log('success')
                if (response.data && response.data.authStatus == "success") {

                    this.props.history.push('/');
                } else {
                    this.setState({
                        message: response.data.message
                    })
                }
            })

    }

    render() {

        return (

            <div className="container login-container">
                <h1 className="header">Login</h1>
                {this.state.message &&
                    <div className="message-box">{this.state.message}</div>
                }
                <div className="form-container">
                    <form onSubmit={this.authenticate}>
                        <div className="input-container">
                            <input
                                placeholder="Username"
                                type="text"
                                onChange={(e) => this.setState({ username: e.target.value })}
                            />
                        </div>
                        <div className="input-container">
                            <input
                                placeholder="Password"
                                type="password"
                                onChange={(e) => this.setState({ password: e.target.value })}
                            />
                        </div>
                        <div className="button-container">
                            <input type="submit" value="Login" />
                        </div>
                    </form>
                    <div className="form-bottom">
                        <h3>Dont have an account.?</h3>
                        <Link to="/signup">Signup</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);