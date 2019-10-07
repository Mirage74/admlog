import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import Admin from './Admin'
import { connect } from 'react-redux'
//import PropTypes from 'prop-types'
//import axios from 'axios'
//import pathServer from "../backendpath"
import { getAdmins } from '../Actions/adminactions'

//let adminsInit

class Viewdeladmins extends Component {

  state = {
    jwt: this.props.jwt,
    redirectAdd: false,
    redirectMainSupervisor: false,
    redirectEditUsers: false,
    redirectLogin: false
  }

  onSubmitAdd = e => {
    e.preventDefault()
    this.setState({ redirectAdd: true })
  }

  onSubmitEditUsers = e => {
    e.preventDefault()
    this.setState({ redirectEditUsers: true })
  }



  onSubmitMainSupervisor = e => {
    e.preventDefault()
    //console.log("onSubmitMainSupervisor, view/del/adm")
    this.setState({ redirectMainSupervisor: true })
  }

  onSubmitLogout = e => {
    e.preventDefault()
    this.setState({ redirectLogin: true })
  }

 componentDidMount() {
    this.props.getAdmins(this.props.jwt)
    //console.log("this.props admins : ", this.props)
    // console.log("this.props : ", this.props)
  }



  render() {
    const { admins, jwt } = this.props
    const { isSupervisor, isAdmin } = this.props.location.state

    

    let forRender
    if (jwt !== "empty") {
      let listAdmins
      if (admins.length > 0) {
        listAdmins = (
          <div>
            {admins.map(cnt => (
              <Admin
                key={cnt._id}
                admin={cnt}
              />
            ))}
          </div>
        )
      } else {
        listAdmins = (
          <div></div>
        )
      }      
      forRender = (
        <div>
          <div className="row">
            <div className="col">
              <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitAdd} >Add admin/user</button>
            </div>
            <div className="col">
              <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitEditUsers} >View/Edit/Del users</button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitMainSupervisor} >Main menu</button>
            </div>
            <div className="col">
              <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitLogout} >Logout</button>
            </div>
          </div>
          <br />

          <h1 className="display-4 mb-2">
            Admin List
          </h1>
          {listAdmins}
        </div>

      )
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
      return <Redirect to={{
        pathname: 'Supervisormain',
        state: {
          isSupervisor: isSupervisor,
          isAdmin: isAdmin
        }
      }}
      />            
    }

    if (this.state.redirectEditUsers) {
      return <Redirect to={{
        pathname: 'Editusers',
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

// Contacts.propTypes = {
//   contacts: PropTypes.array.isRequired,
//   getContacts: PropTypes.func.isRequired
// }

const mapStateToProps = (state) => ({
  admins: state.admin.admins
})


export default connect(mapStateToProps, { getAdmins })(Viewdeladmins)
