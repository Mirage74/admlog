import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./SupervisorMain.css"
import { AUTH_SERVER, MIN_USER_LOGIN_LENGTH, MIN_USER_PASSWORD_LENGTH, INITIAL_USER_LOGON_ATTEMPTS, USER_NUM_MIN, USER_NUM_MAX } from '../config'
import axios from 'axios'

class AddUser extends Component {
  state = {
    jwt: this.props.jwt,
    redirectEditUsers: false,
    redirectLogin: false,
    login: '',
    password: '',
    attempts: INITIAL_USER_LOGON_ATTEMPTS,
    errors: {}
  }



  onSubmitEditUsers = e => {
    e.preventDefault()
    this.setState({ redirectEditUsers: true })
  }

  onSubmitLogout = e => {
    e.preventDefault()
    this.setState({ redirectLogin: true })
  }

  onSubmitAddUser = e => {
    e.preventDefault()
    const { login, password } = this.state


    if (login.length < MIN_USER_LOGIN_LENGTH) {
      this.setState({ errors: { login: `login length must be at least ${MIN_USER_LOGIN_LENGTH}` } })
      return
    }

    if (password.length < MIN_USER_PASSWORD_LENGTH) {
      this.setState({ errors: { password: `password length must be at least ${MIN_USER_PASSWORD_LENGTH}` } })
      return
    }


    const configAx = {
      headers: {
        //'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZGM2ZGM2MTg4ODQ4MDY2NDFkNDkzMiIsImxvZ2luIjoiZ2RoOGNrd3E1ZCIsImlhdCI6MTU1ODMxNTE5NX0.3iGEiKOdZ1b02_rJ5Pz3Cq4L7qHgVw6_66tYI4KMcZ4',
        'Authorization': this.state.jwt,
        'login': login
      }
    }

    //    console.log("configAx", configAx)

    axios.get(
      AUTH_SERVER + 'checkuserexist',
      configAx
    )
      .then(ifExistUser => {
        //console.log(ifExistUser.data)
        if (ifExistUser.data === "USER_NOT_FOUND") {
          axios.post(AUTH_SERVER + 'user', {
            "login": login,
            "password": password,
            "isUser": true
          })
            .then(res => {
              //console.log("res add user: ", res.data)
              this.setState({ redirectEditUsers: true })
            })
            .catch(err => {
              console.log("error creating new user : ", err)
            })
        } else {

          this.setState({ errors: { login: `user ${login} already exist !` } })
          return

        }
      })

  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })


  render() {
    //console.log("props addUser : ", this.props)
    const { jwt, errors } = this.state
    //console.log("errors: ", errors)
    let forRender, buttonLogin, buttonPass, buttonAttempts, buttonUserNo
    if (jwt !== "empty") {
      if (!errors.login) {
        buttonLogin = (
          <div style={{ marginBottom: 25 }} className="input-group">
            <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
            <input id="login-username" type="text" className="form-control" name="login" onChange={this.onChange} value={this.state.login} placeholder="login" />
          </div>
        )
      } else {
        buttonLogin = (
          <div className="form-group row">
            <div style={{ marginBottom: 25 }} className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
              <input id="login-username" type="text" className="form-control is-invalid" name="login" onChange={this.onChange} value={this.state.login} placeholder="login" />
            </div>

            <div>
              <span className="help-block text-danger">{errors.login}</span>
            </div>
          </div >
        )
      }

      if (!errors.password) {
        buttonPass = (
          <div style={{ marginBottom: 25 }} className="input-group">
            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
            <input id="login-password" type="password" className="form-control" onChange={this.onChange} value={this.state.password} name="password" placeholder="password" />
          </div>

        )
      } else {
        buttonPass = (
          <div className="form-group row">
            <div style={{ marginBottom: 25 }} className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
              <input id="login-password" type="password" className="form-control is-invalid" onChange={this.onChange} value={this.state.password} name="password" placeholder="password" />
            </div>
            <div>
              <span className="help-block text-danger">{errors.password}</span>
            </div>
          </div >
        )
      }

      buttonAttempts = (
        <div>
          <small>
            Attempts
          </small>
          <div style={{ marginBottom: 25 }} className="input-group">
            <input id="attempts" type="number" className="form-control" name="attempts" onChange={this.onChange} value={this.state.attempts} />
          </div>
        </div>
      )

      let str = `UserNo between ${USER_NUM_MIN} and ${USER_NUM_MAX}`
      let nmUser = []
      for ( let i = USER_NUM_MIN; i <= USER_NUM_MAX; i++) {
        nmUser.push(i)
      }

      buttonUserNo = (
        <div>
          <div style={{ marginBottom: 25 }} className="input-group">
            <label for="exampleSelect1">{str}</label>
            <select className="form-control" id="UserNo">
            {nmUser.map(cnt => (
              <option>
                {cnt}
              </option>
            ))}

            </select>

          </div>
        </div>
      )

      forRender = (
        <div>
          <div className="container">
            <div id="adduserbox" style={{ marginTop: 50 }} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
              <div className="panel panel-info">
                <div className="panel-heading">
                  <div className="panel-title">Creating new User</div>
                </div>

                <div style={{ paddingTop: 30 }} className="panel-body">
                  <form name="my-form" id="loginform" className="form-horizontal" onSubmit={this.onSubmit}>

                    {buttonLogin}
                    {buttonPass}
                    {buttonAttempts}
                    {buttonUserNo}
                    <div style={{ marginTop: 10 }} className="form-group">
                      <div className="col-sm-12 controls">
                        <button type="submit" id="btn-login" className="btn btn-success" onClick={this.onSubmitAddUser} >Create</button>
                      </div>
                    </div>

                  </form>

                </div>
              </div>
              <div className="row">
                <div className="col">
                  <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitEditUsers} >Edit Users</button>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitLogout} >Logout</button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )
    } else {
      console.log(`Access denied, missing "JWT" props`)
      return <Redirect to='/login' />
    }


    if (this.state.redirectEditUsers) {
      return <Redirect to='/Editusers' />
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


export default AddUser
