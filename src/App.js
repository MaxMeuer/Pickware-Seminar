import React, { Component } from "react";
import './App.css';
import HelloScreen from './Routes/helloScreen';
import BruteForce from "./Routes/bruteForce";
import Netzplan from "./Routes/netzplan";
import Sidebar from "./Components/sidebar"
import Header from "./Components/header"
import { Row, Col } from 'reactstrap';
import { HashRouter as Router, Route } from "react-router-dom";
import ByeScreen from "./Routes/byeScreen";


class App extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {}
    this.useCase = this.useCase.bind(this)
  }

  render() {
    const { showUseCase } = this.state
    return (
      <div className="App" >
        <Row>
          <Col xl="2" lg="2">
            <Sidebar />
          </Col>
          <Col xl="10" lg="10">
            <Row>
              <Col>
                <Header />
              </Col>
            </Row>
            <Row>
              <Router>
                <Route exact path="/" component={(props) => < HelloScreen {...props} useCase={this.useCase} />} />
                <Route path="/netzplan" component={(props) => < Netzplan {...props} showUseCase={true} />} />
              </Router>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }

  useCase(bool) {
    this.setState({ showUseCase: bool })
  }
}

export default App;
