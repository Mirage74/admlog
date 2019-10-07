import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import { AUTH_SERVER, MIN_USER_LOGIN_LENGTH, MIN_USER_PASSWORD_LENGTH, INITIAL_USER_LOGON_ATTEMPTS, USER_NUM_MIN, USER_NUM_MAX, ADD_ADMIN_USER_DEFAULT, ADD_LOCK_USER_DEFAULT } from '../config'
import { connect } from 'react-redux'
import { getUsers, addUser, getApps, addApp, setApps } from '../Actions/adminactions'
import axios from 'axios'
//import uuid from 'uuid'
import Login from './layout/add/Login'
import Password from './layout/add/Password'
import AdminOrUser from './layout/add/AdminOrUser'
import Attempts from './layout/add/Attempts'
import UserNo from './layout/add/UserNo'
import Lock from './layout/add/Lock'
import AccessApps from './layout/add/AccessApps'



class Add extends Component {
  state = {
    addAmin: ADD_ADMIN_USER_DEFAULT,
    jwt: this.props.jwt,
    redirectMainSupervisor: false,
    redirectViewDelAdmins: false,
    redirectEditUsers: false,
    redirectLogin: false,
    addFieldGrantAccess: false,
    login: '',
    password: '',
    grantAccessNewAppName: '',
    grantAccessNewArgName: '',
    attempts: INITIAL_USER_LOGON_ATTEMPTS,
    userNo: "",
    lockUser: ADD_LOCK_USER_DEFAULT,
    //userAccessApps: [],
    msgCreated: "",
    errors: {}
  }

  componentDidMount() {
    this.props.getUsers(this.props.jwt)
    this.props.setApps([])
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })


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

  onSubmitGrantAccess = e => {
    e.preventDefault()
    this.setState({ addFieldGrantAccess: true })
    this.setState({ errors: { newAppGrantAcc: "" } })
  }

  onSubmitNewAccess = e => {
    const { grantAccessNewAppName, grantAccessNewArgName } = this.state
    const { apps } = this.props
    //console.log("add onSubmitNewAccess ")
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
        //userAccessApps.push(oneRec)
        this.props.addApp(oneRec)
        //        this.setState({ userAccessApps: userAccessApps })
        this.setState({ grantAccessNewAppName: "" })
        this.setState({ grantAccessNewArgName: "" })
        this.setState({ addFieldGrantAccess: false })
      }
    }
  }

  onSubmitAddAdmin = e => {
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

    const configAx = {
      headers: {
        'Authorization': this.state.jwt,
        'login': login
      }
    }

    axios.get(
      AUTH_SERVER + 'checkuserexist',
      configAx
    )
      .then(ifExistUser => {
        if (ifExistUser.data === "USER_NOT_FOUND") {
          axios.post(AUTH_SERVER + 'user', {
            "login": login,
            "password": password,
            "isSupervisor": false,
            "isAdmin": true
          })
            .then(res => {
              this.setState({ msgCreated: `Admin ${this.state.login} is successfully created !` })
              this.setState({ login: "" })
              this.setState({ password: "" })
              this.setState({ errors: {} })
            })
            .catch(err => {
              console.log("error creating new admin : ", err)
            })
        } else {

          this.setState({ errors: { login: `user ${login} already exist !` } })
          return

        }
      })

  }

  onSubmitAddUser = e => {
    e.preventDefault()
    const { login, password, attempts, lockUser } = this.state
    const { users } = this.props
    let { userNo } = this.state
    if (userNo.length === 0) {

      let min = 0
      let isExist
      let i = USER_NUM_MIN
      while ((min === 0) && (i <= USER_NUM_MAX)) {
        isExist = false
        for (let j = 0; j < users.length; j++) {
          if (users[j].userNo === i) {
            isExist = true
          }
        }
        if (!isExist) {
          min = i
        }
        i++
      }

      if (i > USER_NUM_MAX) {
        console.log("No free userNo !!!")
      }
      userNo = min
    }


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
        'Authorization': this.state.jwt,
        'login': login
      }
    }

    axios.get(
      AUTH_SERVER + 'checkuserexist',
      configAx
    )
      .then(ifExistUser => {
        if (ifExistUser.data === "USER_NOT_FOUND") {
          axios.post(AUTH_SERVER + 'user', {
            "login": login,
            "password": password,
            "attempts": attempts,
            "userNo": userNo,
            "lockUser": lockUser,
            "allowedApps": this.props.apps
          })
            .then(res => {
              this.setState({ msgCreated: `"User ${this.state.login} is successfully created !` })
              this.setState({ login: "" })
              this.setState({ password: "" })
              this.setState({ errors: {} })
              this.props.setApps([])
              //this.setState({ userAccessApps: [] })

              // let userObj = { _id: res.data._id, login: res.data.login, attempts: res.data.attempts, userNo: res.data.userNo, lockUser: res.data.lockUser, allowedApps: res.data.allowedApps }
              // console.log("res: ", res)
              // console.log("userObj: ", userObj)
              this.props.addUser(res.data)

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
    const { jwt, errors, addAmin, msgCreated, addFieldGrantAccess, grantAccessNewAppName, grantAccessNewArgName } = this.state
    const { users } = this.props
    const { isSupervisor, isAdmin } = this.props.location.state
    //console.log(isSupervisor)

    let forRender, menuButtons

    const viewDelAdmin = (
      <div className="col">
        <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitViewDelAdmins} >View/Del admins</button>
      </div>
    )

    const viewEditDelUsers = (
      <div className="col">
        <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitEditUsers} >View/Edit/Del users</button>
      </div>
    )

    const MainMenu = (
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
          {viewDelAdmin}
          {viewEditDelUsers}
          {MainMenu}
          {logout}
        </div>
      )
    } else {
      if (isAdmin === true) {
        menuButtons = (
          <div className="row">
            {viewEditDelUsers}
            {MainMenu}
            {logout}
          </div>
        )
      }
    }
    const AddAdmin = () => {

      forRender = (
        <div>
          <div className="container">
            <div className="row">
              <div className="col">

                <div className="panel-title">{msgCreated}</div>
                <div id="addadminbox" style={{ marginTop: 50 }} className="">
                  <div className="panel panel-info">
                    <div className="panel-heading">
                      <div className="panel-title">Creating new Admin</div>
                    </div>

                    <div style={{ paddingTop: 30 }} className="panel-body">
                      <form name="my-form" id="loginform" className="form-horizontal" onSubmit={this.onSubmit}>


                        <Login isInvalid={errors.login} onChange={this.onChange} login={this.state.login}  disable="false"/>
                        <Password isInvalid={errors.password} onChange={this.onChange} password={this.state.password} />
                        <AdminOrUser onChange={this.onChange} addAmin={this.state.addAmin} />
                        <div style={{ marginTop: 10 }} className="form-group">
                          <div className="col-sm-12 controls">
                            <button type="submit" id="btnsuper" className="btn btn-success" onClick={this.onSubmitAddAdmin} >Create</button>
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
    }


    const AddUserForm = () => {
      forRender = (
        <div>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="panel-title">{msgCreated}</div>
                <div id="adduserbox" style={{ marginTop: 50 }} className="">
                  <div className="panel panel-info">
                    <div className="panel-heading">
                      <div className="panel-title">Creating new User</div>
                    </div>

                    <div style={{ paddingTop: 30 }} className="panel-body">
                      <form name="my-form" id="loginform" className="form-horizontal" onSubmit={this.onSubmit}>

                        <Login isInvalid={errors.login} onChange={this.onChange} login={this.state.login} disable="false" />
                        <Password isInvalid={errors.password} onChange={this.onChange} password={this.state.password} />
                        <AdminOrUser onChange={this.onChange} addAmin={this.state.addAmin} isSupervisor={isSupervisor} />
                        <Attempts onChange={this.onChange} attempts={this.state.attempts} />
                        <UserNo min={USER_NUM_MIN} max={USER_NUM_MAX} users={users} onChange={this.onChange} userNo={this.state.userNo} />
                        <Lock onChange={this.onChange} lockUser={this.state.lockUser} />
                        <AccessApps showFormAddAccess={addFieldGrantAccess} error={this.state.errors.newAppGrantAcc} onChange={this.onChange}
                          onSubmitGrantAccess={this.onSubmitGrantAccess} userAccessApps={this.props.apps} grantAccessNewAppName={grantAccessNewAppName}
                          grantAccessNewArgName={grantAccessNewArgName} onSubmitNewAccess={this.onSubmitNewAccess} />
                        <div style={{ marginTop: 10 }} className="form-group">
                          <div className="col-sm-12 controls">
                            <button type="submit" id="btnsuper" className="btn btn-success btn-lg" onClick={this.onSubmitAddUser} >Create</button>
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
    }



    if (jwt !== "empty") {
      if (addAmin === "true") {
        AddAdmin()
      } else {
        AddUserForm()
      }
    } else {
      console.log(`Access denied, missing "JWT" props`)
      return <Redirect to='/login' />
    }


    if (this.state.redirectMainSupervisor) {
      return <Redirect to={{
        pathname: 'Supervisormain',
        state: {
          isSupervisor: isSupervisor,
          isAdmin: isAdmin
        }
      }}
      />       
    }

    if (this.state.redirectViewDelAdmins) {
      return <Redirect to={{
        pathname: 'Viewdeladmins',
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


    return (
      <div>
        {forRender}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.admin.users,
  apps: state.admin.apps
})


export default connect(mapStateToProps, { getUsers, addUser, getApps, addApp, setApps })(Add)


