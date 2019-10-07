import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { Redirect } from "react-router-dom"
import { AUTH_SERVER } from '../config'
import axios from 'axios'

class Login extends Component {

  state = {
    login: '',
    password: '',
    errors: {},
    jwt: "empty",
    redirectSupervisor: false,
    isSupervisor: false,
    isAdmin: false,
    redirectClient: false,
    allowedApps: ""
  }



  onSubmit = e => {
    e.preventDefault()
    const { login, password } = this.state

    if (login === '') {
      this.setState({ errors: { login: 'login is required' } })
      return
    }

    if (password === '') {
      this.setState({ errors: { password: 'password is required' } })
      return
    }

    axios.post(AUTH_SERVER + 'login', {
      "login": login,
      "password": password
    })
      .then(res => {
        //  console.log("res : ", res.data)
        if (res.data === "Login failed") {
          this.setState({ errors: { password: 'Login failed' } })
        }
        if (res.data.token) {
          this.setState({ jwt: res.data.token })
          this.props.jwt("" + this.state.jwt)
        }
        //console.log("res.data : ", res.data)
        if ((res.data.isSupervisor) || (res.data.isAdmin)) {
          if (res.data.isSupervisor === true) {
            
            this.setState({ isSupervisor: true })  
          }
          if (res.data.isAdmin === true) {
            this.setState({ isAdmin: true })  
          }          
          this.setState({ redirectSupervisor: true })
        } else {
            this.setState({ allowedApps: res.data.allowedApps })
            this.setState({ redirectClient: true })
        }

      })
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });


  render() {
    const { redirectSupervisor, redirectClient,  errors } = this.state


    let forRender, buttonLogin, buttonPass


    // if (redirectSupervisor) {
    //   return <Redirect to='/SupervisorMain' />
    // }

    if (redirectSupervisor) {
      return <Redirect to={{
        pathname: 'SupervisorMain',
        state: {
          isSupervisor: this.state.isSupervisor,
          isAdmin: this.state.isAdmin,
          login: this.state.login
        }
      }}
      />
    }

    if (redirectClient) {
      return <Redirect to={{
        pathname: 'Client',
        state: {
          login: this.state.login,
          allowedApps: this.state.allowedApps
        }
      }}
      />
    }
    


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

    forRender = (
      <div>
        <div className="container">
          <div id="loginbox" style={{ marginTop: 50 }} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <div className="panel panel-info">
              <div className="panel-heading">
                <div className="panel-title">Log In</div>
              </div>

              <div style={{ paddingTop: 30 }} className="panel-body">
                <form name="my-form" id="loginform" className="form-horizontal" onSubmit={this.onSubmit}>

                  {buttonLogin}
                  {buttonPass}

                  <div style={{ marginTop: 10 }} className="form-group">


                    <div className="col-sm-12 controls text-center">

                      <button type="submit" id="btnsuper" className="btn btn-success" >Login</button>
                    </div>
                  </div>

                </form>

              </div>
            </div>
          </div>

        </div>
      </div>
    )


    return (
      <div>
        {forRender}
      </div>
    )
  }
}

export default Login;
