import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { Redirect } from "react-router-dom"
import Row from 'react-bootstrap/Row'

class About extends Component {
  state = {
    redirectLogin: false
  }

  handleBack = e => {
    e.preventDefault()
    this.setState({ redirectLogin: true })
  }

  render() {
    if (this.state.redirectLogin) {
      return <Redirect to='/Login' />
    }

    
    return (
      <div>
        <br /><br /><br />
        <Row className="justify-content-md-center">
          <h5>Hello ! This app is written using <b>React-Redux, Koa, MongoDB</b>.</h5>
        </Row>
        <Row className="justify-content-md-center">
          <h5 className="display-6">Source code Front-End:</h5>
        </Row>
        <Row className="justify-content-md-center">
          <a href="https://github.com/Mirage74/admlog">Front-end on "Github"</a>
        </Row>
        <Row className="justify-content-md-center">
          <h5 className="display-6">Source code Back-End:</h5>
        </Row>
        <Row className="justify-content-md-center">
          <a href="https://github.com/Mirage74/jwt-auth-admlog">Back-end on "Github"</a>
        </Row>
        <br /><br />
        <Row className="justify-content-md-center">
          <h5 className="display-6">This app for supervisor, admins and users.</h5>
        </Row>
        <Row className="justify-content-md-center">
          <h5 className="display-6">For test you can login as supervisor, using:</h5>
        </Row>
        <Row className="justify-content-md-center">        
          <h5 className="display-6">"login": "gdh8ckwq5d", "password": "z$cgKX?Qqwh?5+wV"</h5>
        </Row>
        <Row className="justify-content-md-center">
        <h5 className="display-6">then create admin or user, and re-enter as admin or user</h5>
      </Row>        
        <br /><br />
        <Row className="justify-content-md-center">
          <h5 className="display-5">By Alex Babrouski</h5>
        </Row>
        <Row className="justify-content-md-center">
          <h5 className="display-5">e-mail:
              <a href="mailto:balexvicx@gmail.com">balexvicx@gmail.com</a>
          </h5>
        </Row>
        <Row className="justify-content-md-center">
          <h5 className="display-5">phone: (+48)733-195-061</h5>
        </Row>
        <Row className="justify-content-md-center">
          <Button onClick={this.handleBack}>Back</Button>
        </Row>
      </div>
    )
  }
}

export default About