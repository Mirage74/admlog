import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
//import "bootstrap/dist/css/bootstrap.min.css"
import "./SupervisorMain.css"

class SupervisorMain extends Component {

  state = {
    jwt: this.props.jwt,
    redirectAdd: false,
    redirectViewDelAdmins: false,
    redirectEditUsers: false,
    redirectLogin: false
  }



  onSubmitAdd = e => {
    e.preventDefault()
    this.setState({ redirectAdd: true })
  }


  onSubmitViewDelAdmins = e => {
    e.preventDefault()
    this.setState({ redirectViewDelAdmins: true })
  }

  onSubmitEditUsers = e => {
    e.preventDefault()
    this.setState({ redirectEditUsers: true })
  }

  onSubmitLogout = e => {
    e.preventDefault()
    this.setState({ redirectLogin: true })
  }

  render() {
    const { isSupervisor, isAdmin, login } = this.props.location.state
  //console.log("supmain props : ", this.props)
    const { jwt } = this.props

    // if (this.state.redirectAdd) {
    //   return <Redirect to='/Add' />
    // }

    if (this.state.redirectAdd) {
      return <Redirect to={{
        pathname: 'Add',
        state: {
          isSupervisor: isSupervisor,
          isAdmin: isAdmin
        }
      }}
      />      
    }    


    if (this.state.redirectViewDelAdmins) {
      return <Redirect to={{
        pathname: 'ViewDelAdmins',
        state: {
          isSupervisor: isSupervisor,
          isAdmin: isAdmin
        }
      }}
      />                  
    }

    if (this.state.redirectEditUsers) {
      return <Redirect to={{
        pathname: 'EditUsers',
        state: {
          isSupervisor: isSupervisor,
          isAdmin: isAdmin
        }
      }}
      />            
    }

    if (this.state.redirectLogin) {
      return <Redirect to='/Login' />
    }

    let forRender

    if (jwt !== "empty") {
      if (isSupervisor === true) {
        forRender = (
          <div className="container">
            <div className="row">
              <h3>Hello, <i>supervisor</i> "{login}" ! </h3>
            </div>
            <div className="col">
              <div className="col">
                <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitAdd} >Add admin/user</button>
              </div>
              <div className="col">
                <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitViewDelAdmins} >View/Del admins</button>
              </div>
              <div className="col">
                <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitEditUsers} >View/Edit/Del users</button>
              </div>
              <div className="col">
                <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitLogout} >Logout</button>
              </div>
            </div>
          </div>
        )
      } else {
        if (isAdmin === true) {
          forRender = (
            <div className="container">
              <div className="row">
              <h3>Hello, <i>admin</i> "{this.props.location.state.login}" ! </h3>
              </div>
              <div className="col">
                <div className="col">
                  <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitAdd} >Add user</button>
                </div>
                <div className="col">
                  <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitEditUsers} >View/Edit/Del users</button>
                </div>
                <div className="col">
                  <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitLogout} >Logout</button>
                </div>
              </div>
            </div>
          )

        }
      }
    } else {
      console.log(`Access denied, missing "JWT" props`)
      return <Redirect to='/login' />
    }


    return (
      <div>
        {forRender}
      </div>
    )
  }
}


export default SupervisorMain
