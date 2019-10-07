import React from 'react'
function Password(props) {
  if (!props.isInvalid) {
    return (
      <div style={{ marginBottom: 25 }} className="input-group">
        <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
        <input id="login-password" type="password" className="form-control" onChange={props.onChange} value={props.password} name="password" placeholder="password" />
      </div>
    )
  } else
    return (
      <div className="form-group row">
        <div style={{ marginBottom: 25 }} className="input-group">
          <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
          <input id="login-password" type="password" className="form-control is-invalid" onChange={props.onChange} value={props.password} name="password" placeholder="password" />
        </div>
        <div>
          <span className="help-block text-danger">{props.isInvalid}</span>
        </div>
      </div >
    )
}

export default Password

