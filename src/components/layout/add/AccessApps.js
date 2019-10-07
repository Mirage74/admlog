import React, { Component } from 'react'
import Accessapp from './AccessApp'
import AddAccess from './AddAccess'
import uuid from 'uuid'
// import { connect } from 'react-redux'
// import { getApps } from '../../../Actions/adminactions'

class AccessApps extends Component {


  render() {
    return (
      <div>
        <small>
          Access Apps
      </small>
        <h5>
          <button type="button" id="btn-addAccess" className="btn btn-primary btn-xs" onClick={this.props.onSubmitGrantAccess} >Grant access to new app</button>
        </h5>
        <AddAccess showFormAddAccess={this.props.showFormAddAccess} error={this.props.error} onChange={this.props.onChange} 
          grantAccessNewAppName={this.props.grantAccessNewAppName} grantAccessNewArgName={this.props.grantAccessNewArgName} onSubmitNewAccess={this.props.onSubmitNewAccess} />
        <div>
          {this.props.userAccessApps.map(cnt => (
            <Accessapp
              appName={cnt.appName}
              appArg={cnt.appArg}
              key={uuid()}
            />
          ))}
        </div>

      </div>
    )
  }
}

// const mapStateToProps = (state) => ({
//   users: state.admin.apps
// })


//export default connect(mapStateToProps, { getApps })(AccessApps)
export default AccessApps






