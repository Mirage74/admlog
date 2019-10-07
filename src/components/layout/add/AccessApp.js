import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteApp } from '../../../Actions/adminactions'
//import PropTypes from 'prop-types'



class Accessapp extends Component {

  
  onDeleteClick = appName => {
    this.props.deleteApp(appName)
  }

  render() {
    //console.log("Accessapp(props) : ", this.props)
    return (
      <div>
        <div className="card card-body mb-3">
          <h4 align="left">
            <i className="fas fa-times"
              style={{ cursor: 'pointer', float: 'right', color: 'red' }}
              onClick={this.onDeleteClick.bind(this, this.props.appName)}
            />
            <div>
              app name : <b>{this.props.appName}</b>
              <br />
              arg: <b> {this.props.appArg} </b>
            </div>
          </h4>
        </div>
      </div>
    )

  }
}

// const mapStateToProps = (state) => ({
//   apps: state.admin.apps
// })

export default connect(null, { deleteApp })(Accessapp)

//export default Accessapp


