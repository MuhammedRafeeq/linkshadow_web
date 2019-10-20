import React, { Component } from 'react';
import Chart from '../../components/Chart'
import Fireworks from '../../components/FireWorks'
import Config from '../../config/Config.json'
import axios from 'axios';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {

    state = {
        activeTab: "chart"
    }

    componentDidMount = () => {

        axios.get(Config.baseUrl + "/chart/")
            .then((response) => {
                console.log(response)
            })
    }

    handleTab = (tab) => {

        this.setState({
            activeTab: tab
        })
    }

    logout = () => {
        this.props.history.push('/login');
    }

    render() {

        return (

            <div className="container dashboard-container">
                <div className="top-bar">
                    <div className="left-block">
                        <h3>Dashboard</h3>
                    </div>
                    <div className="right-block">
                        <a onClick={this.logout}>Logout</a>
                    </div>
                </div>
                <div className="main-container">
                    <div className="tab-nav">
                        <div
                            className={"menu " + (this.state.activeTab == "chart" && "active")}
                            onClick={(e) => this.handleTab("chart")}
                        >
                            <h3>Chart</h3>
                        </div>
                        <div
                            className={"menu " + (this.state.activeTab == "fireworks" && "active")}
                            onClick={(e) => this.handleTab("fireworks")}
                        >
                            <h3>Fireworks</h3>
                        </div>
                    </div>
                    <div className="tab-wrapper">
                        <div className="tab-container">
                            {this.state.activeTab == "chart" && <Chart /> }
                            {this.state.activeTab == "fireworks" && <Fireworks /> }
                        </div>
                    </div>
                </div>
                <div className="footer-bar">
                    <span>@2019</span>
                </div>
            </div>
        )
    }
}

export default withRouter(Dashboard)