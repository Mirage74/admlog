import React from 'react'
function Login(props) {
  if (props.disable === "false") {
    if (!props.isInvalid) {
      return (
        <div style={{ marginBottom: 25 }} className="input-group">
          <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
          <input id="login-username" type="text" className="form-control" name="login" onChange={props.onChange} value={props.login} placeholder="login" />
        </div>
      )
    } else
      return (
        <div className="form-group row">
          <div style={{ marginBottom: 25 }} className="input-group">
            <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
            <input id="login-username" type="text" className="form-control is-invalid" name="login" onChange={props.onChange} value={props.login} placeholder="login" />
          </div>
          <div>
            <span className="help-block text-danger">{props.isInvalid}</span>
          </div>
        </div >
      )
  } else {
    return (
      <div style={{ marginBottom: 25 }} className="input-group">
        <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
        <input id="login-username" disabled className="form-control" value={props.login}  />
      </div>
    )
  }
}
export default Login


