import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteAdmin } from '../Actions/adminactions'

class Admin extends Component {
  // state = {
  //   showContactInfo: false
  // }

  onDeleteClick = MyID => {
    this.props.deleteAdmin(MyID);
  }

  render() {
    const { _id, login } = this.props.admin
    return (
      <div className="card card-body mb-3">
        <h4 align="left">
          {login}
          <i className="fas fa-times"
            style={{ cursor: 'pointer', float: 'right', color: 'red' }}
            onClick={this.onDeleteClick.bind(this, _id)}
          />
        </h4>
      </div>
    )
  }
}


export default connect(
  null,
  { deleteAdmin }
)(Admin)
