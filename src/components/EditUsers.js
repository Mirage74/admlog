import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import User from './User'
import { connect } from 'react-redux'
import { getUsers } from '../Actions/adminactions'


class EditUsers extends Component {
  state = {
    jwt: this.props.jwt,
    redirectAdd: false,
    redirectMainSupervisor: false,
    redirectViewDelAdmins: false,
    redirectLogin: false
  }

  componentDidMount() {
    //    console.log("this.props.jwt editusers : ", this.props.jwt)
    //this.setState({ jwt: this.props.jwt })
    //console.log("this.state.jwt : ", this.state.jwt)
    this.props.getUsers(this.props.jwt)
    //console.log("usersInit : ", usersInit)
  }


  onSubmitAdd = e => {
    e.preventDefault()
    this.setState({ redirectAdd: true })
  }

  onSubmitMainSupervisor = e => {
    e.preventDefault()
    this.setState({ redirectMainSupervisor: true })
  }

  onSubmitViewDelAdmins = e => {
    e.preventDefault()
    this.setState({ redirectViewDelAdmins: true })
  }

  onSubmitLogout = e => {
    e.preventDefault()
    this.setState({ redirectLogin: true })
  }


  render() {
    const { users, jwt } = this.props
    const { isSupervisor, isAdmin } = this.props.location.state
    //console.log("editusers this.props.location.state : ", this.props.location.state)

    let forRender
    if (jwt !== "empty") {
      let listUsers
      if (users.length > 0) {
        listUsers = (
          <div>
            {users.map(cnt => (
              <User
                key={cnt._id}
                user={cnt}
                isSupervisor={isSupervisor}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        )
      } else {
        listUsers = (
          <div></div>
        )
      }

      const addAdminUser = (
        <div className="col">
          <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitAdd} >Add admin/user</button>
        </div>
      )
      const addUser = (
        <div className="col">
          <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitAdd} >Add user</button>
        </div>
      )
      const viewDelAdmins = (
        <div className="col">
          <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitViewDelAdmins} >View/Del admins</button>
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
        forRender = (
          <div>
            <div className="row">
              {addAdminUser}
              {viewDelAdmins}
            </div>
            <div className="row">
              {mainMenu}
              {logout}
            </div>
            <br />
            <h1 className="display-4 mb-2">
              User List
          </h1>
            {listUsers}
          </div>
        )
      } else {
        if (isAdmin === true) {
          forRender = (
            <div>
              <div className="row">
                {addUser}
                {mainMenu}
                {logout}
              </div>
              <br />
              <h1 className="display-4 mb-2">
                User List
          </h1>
              {listUsers}
            </div>
          )
        }
      }
    } else {
      console.log(`Access denied, missing "JWT" props`)
      return <Redirect to='/login' />
    }

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

    if (this.state.redirectMainSupervisor) {
      console.log("edit users process: ", process)
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
  users: state.admin.users
})

export default connect(mapStateToProps, { getUsers })(EditUsers)


