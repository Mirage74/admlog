import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
//import TextInputGroup from './layout/textinputgroup'
//import PropTypes from 'prop-types'
//import { AUTH_SERVER } from '../config'
import { connect } from 'react-redux'
import { getUser, getApps, addApp, setApps, updUser } from '../Actions/adminactions'
import Login from './layout/add/Login'
import Attempts from './layout/add/Attempts'
import UserNo from './layout/edit/UserNo'
import ShowJwt from './layout/edit/Jwt'
import Lock from './layout/add/Lock'
import AccessApps from './layout/add/AccessApps'
//import { getUser, updateContact } from '../../Actions/contactactions'

let user

class Editexistuser extends Component {
  state = {
    jwt: this.props.jwt,
    id: 0,
    login: '',
    userNo: 0,
    lockUser: 0,
    attempts: 0,
    userJWT: "",
    msgUpdated: "",
    errors: {},
    addFieldGrantAccess: false,
    grantAccessNewAppName: '',
    grantAccessNewArgName: '',
    redirectMainSupervisor: false,
    redirectViewDelAdmins: false,
    redirectEditUsers: false,
    redirectLogin: false
  }



  async componentDidMount() {
    user = await this.props.getUser(this.props.jwt, this.props.match.params._id)
    this.props.setApps(user.allowedApps)
    this.setState({
      id: this.props.match.params._id,
      login: user.login,
      userNo: user.userNo,
      lockUser: user.lockUser,
      attempts: user.attempts,
      userJWT: user.jwt
    })
  }

  onSubmitGrantAccess = e => {
    e.preventDefault()
    this.setState({ addFieldGrantAccess: true })
    this.setState({ errors: { newAppGrantAcc: "" } })
  }

  compare( a, b ) {
    if ( a.appName < b.appName ){
      return -1
    }
    if ( a.appName > b.appName ){
      return 1
    }
    return 0;
  }
  
  
  onSubmitNewAccess = e => {
    const { grantAccessNewAppName, grantAccessNewArgName } = this.state
    const { apps } = this.props
    if (grantAccessNewAppName.length > 0) {
      let ifNewApp = true
      for (let i = 0; i < apps.length; i++) {
        if (apps[i].appName === grantAccessNewAppName) {
          this.setState({ errors: { newAppGrantAcc: `user already have access to app ${grantAccessNewAppName}` } })
          ifNewApp = false
        }
      }
      if (ifNewApp) {
        e.preventDefault()
        let oneRec = {}
        oneRec.appName = grantAccessNewAppName
        oneRec.appArg = grantAccessNewArgName
        this.props.addApp(oneRec)
        this.setState({ grantAccessNewAppName: "" })
        this.setState({ grantAccessNewArgName: "" })
        this.setState({ addFieldGrantAccess: false })
      }
    }
  }


  onChange = e => this.setState({ [e.target.name]: e.target.value })
  

  onSubmit = e => {

    e.preventDefault()

  }

  onSubmitViewDelAdmins = e => {
    e.preventDefault()
    this.setState({ redirectViewDelAdmins: true })
  }

  onSubmitEditUsers = e => {
    e.preventDefault()
    this.setState({ redirectEditUsers: true })
  }

  onSubmitMainSupervisor = e => {
    e.preventDefault()
    this.setState({ redirectMainSupervisor: true })
  }

  onSubmitLogout = e => {
    e.preventDefault()
    this.setState({ redirectLogin: true })
  }


  onSubmitUpdateUser = e => {
    e.preventDefault()
    const { jwt, id, attempts, lockUser } = this.state
    let appsSorted = this.props.apps.sort(this.compare)
    let updatedUser = {
      attempts: attempts,
      lockUser: lockUser,
      allowedApps: appsSorted
    }
    this.props.updUser(jwt, id, updatedUser)
      .then(res => {
        this.setState({ msgUpdated: `User ${this.state.login} is successfully updated !` })
      })
  }


  render() {
    const { jwt, addFieldGrantAccess, grantAccessNewAppName, grantAccessNewArgName, errors, msgUpdated } = this.state
    const { isSupervisor, isAdmin } = this.props.location.state
    let forRender, menuButtons

    const viewDelAdmins = (
      <div className="col">
        <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitViewDelAdmins} >View/Del admins</button>
      </div>
    )
    const viewEditDelUsers = (
      <div className="col">
        <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitEditUsers} >View/Edit/Del users</button>
      </div>
    )
    const mainMenu = (
      <div className="col">
        <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitMainSupervisor} >Main menu</button>
      </div>
    )
    const logout = (
      <div className="col">
        <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitLogout} >Logout</button>
      </div>

    )

    if (isSupervisor === true) {
      menuButtons = (
        <div className="row">
          {viewDelAdmins}
          {viewEditDelUsers}
          {mainMenu}
          {logout}
        </div>
      )
    } else {
      if (isAdmin === true) {
        menuButtons = (
          <div className="row">
            {viewEditDelUsers}
            {mainMenu}
            {logout}
          </div>
        )        
      }
    }
    //const updateUser = () => {
      forRender = (
        <div>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="panel-title">{msgUpdated}</div>
                <div id="edituserbox" style={{ marginTop: 50 }} className="">
                  <div className="panel panel-info">
                    <div className="panel-heading">
                      <div className="panel-title">Updating User</div>
                    </div>

                    <div style={{ paddingTop: 30 }} className="panel-body">
                      <form name="my-form" id="loginform" className="form-horizontal" onSubmit={this.onSubmit}>

                        <Login isInvalid={errors.login} onChange={this.onChange} login={this.state.login} disable="true" />
                        <ShowJwt jwt={this.state.userJWT} />
                        <Attempts onChange={this.onChange} attempts={this.state.attempts} />
                        <UserNo userNo={this.state.userNo} />
                        <Lock onChange={this.onChange} lockUser={this.state.lockUser} />
                        <AccessApps showFormAddAccess={addFieldGrantAccess} error={this.state.errors.newAppGrantAcc} onChange={this.onChange}
                          onSubmitGrantAccess={this.onSubmitGrantAccess} userAccessApps={this.props.apps} grantAccessNewAppName={grantAccessNewAppName}
                          grantAccessNewArgName={grantAccessNewArgName} onSubmitNewAccess={this.onSubmitNewAccess} />
                        <div style={{ marginTop: 10 }} className="form-group">
                          <div className="col-sm-12 controls">
                            <button type="submit" id="btnsuper" className="btn btn-success btn-lg" onClick={this.onSubmitUpdateUser} >Update</button>
                          </div>
                        </div>

                      </form>

                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                {menuButtons}
              </div>
            </div>
          </div>
        </div>
      )
   // }



    if (jwt !== "empty") {
      //updateUser()

      if (this.state.redirectMainSupervisor) {
        return <Redirect to={{
          pathname: '/Supervisormain',
          state: {
            isSupervisor: isSupervisor,
            isAdmin: isAdmin
          }
        }}
        />
        //return <Redirect to='/Supervisormain' />
      }

      if (this.state.redirectViewDelAdmins) {
        return <Redirect to='/Viewdeladmins' />
      }

      if (this.state.redirectEditUsers) {
        return <Redirect to={{
          pathname: '/EditUsers',
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


      return (
        <div className="card mb-3">
          {forRender}
        </div>
      )
    } else {
      console.log(`Access denied, missing "JWT" props`)
      return <Redirect to='/login' />
    }
  }


}
// EditContact.propTypes = {
//     getContact: PropTypes.func.isRequired
// }


const mapStateToProps = (state) => ({
  user: state.admin.user,
  apps: state.admin.apps
})

export default connect(mapStateToProps, { getUser, getApps, addApp, setApps, updUser })(Editexistuser)


