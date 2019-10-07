import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import uuid from 'uuid'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./SupervisorMain.css"

class Client extends Component {

  state = {
    jwt: this.props.jwt,
    redirectLogin: false
  }


  onSubmitLogout = e => {
    e.preventDefault()
    this.setState({ redirectLogin: true })
  }

  componentDidMount() {

  }



  render() {
    const { jwt } = this.props
    const { login, allowedApps } = this.props.location.state
    let forRender
    if (jwt !== "empty") {
      let listApps
      if (allowedApps.length > 0) {
        listApps = allowedApps.map(item =>
          <Row key={uuid()} style={{ fontSize: "1.5rem" }}>
            <Col className="col-client-apps" md={{ span: 2, offset: 1 }}>
              {item.appName}
            </Col>
            <Col className="col-client-apps" md={{ span: 2, offset: 0 }}>
              {item.appArg}
            </Col>
          </Row>
        )
      } else {
        listApps = (
          <div></div>
        )
      }




      forRender = (
        <div>
          <Row style={{ fontSize: "3rem" }}>
            <Col md={{ span: 5, offset: 1 }}>
              Available apps for {login}:
            </Col>
          </Row>
          <Row style={{ fontSize: "2rem" }}>
            <Col md={{ span: 2, offset: 1 }}>
              <b>App name</b>
            </Col>
            <Col md={{ span: 2, offset: 1 }}>
              <b>App arg</b>
            </Col>
          </Row>
          {listApps}
          <div className="row">
            <div className="col">
              <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitLogout} >Logout</button>
            </div>
          </div>
          <br />
        </div>

      )
    } else {
      console.log(`Access denied, missing "JWT" props`)
      return <Redirect to='/login' />
    }


    if (this.state.redirectLogin) {
      return <Redirect to='/Login' />
    }

    return (
      <div>
        {forRender}
      </div>
    )
  }
}


export default Client
