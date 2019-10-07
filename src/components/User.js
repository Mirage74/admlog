import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteUser } from '../Actions/adminactions'

class User extends Component {
  state = {
    showContactInfo: false
  }

  onDeleteClick = MyID => {
    this.props.deleteUser(MyID);
  }

  render() {
    const { _id, login } = this.props.user
    const {isSupervisor, isAdmin } = this.props
    //console.log("user props : ", this.props)
    //<Link to={`user/edit/${_id}`}>
    return (
      <div className="card card-body mb-3">
        <h4 align="left">
          {login}

          <i className="fas fa-times"
            style={{ cursor: 'pointer', float: 'right', color: 'red' }}
            onClick={this.onDeleteClick.bind(this, _id)}
          />

          <Link to={{
            pathname: `user/edit/${_id}`,
            state: {
              isSupervisor: isSupervisor,
              isAdmin: isAdmin
            }
          }}>
            <i
              className="fas fa-pencil-alt"
              style={{ cursor: 'pointer', float: 'right', color: 'black', marginRight: '1rem' }}
            />
          </Link>


        </h4>
      </div>
    )
  }
}


export default connect(
  null,
  { deleteUser }
)(User)
