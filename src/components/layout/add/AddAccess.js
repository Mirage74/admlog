import React from 'react'
function AddAccess(props) {
    //console.log("AddAccess(props) : ", props)
    if (!props.showFormAddAccess) {
        return (
            <div></div>
        )
    } else {
        if (!props.error) {
            return (
                <div>
                    <div>
                        <input className="btn-lg" type="text" name="grantAccessNewAppName" onChange={props.onChange} value={props.grantAccessNewAppName} placeholder="app name" />
                    </div>
                    <div>
                        <input className="btn-lg" type="text" name="grantAccessNewArgName" onChange={props.onChange} value={props.grantAccessNewArgName} placeholder="arg name" />
                    </div>
                    <div>
                        <button type="submit" id="grant-access-submit" className="btn btn-success" onClick={props.onSubmitNewAccess} >Grant access</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div>
                        <input className="btn-lg is-invalid" type="text" name="grantAccessNewAppName" onChange={props.onChange} value={props.grantAccessNewAppName} placeholder="app name" />
                    </div>
                    <div>
                        <span className="help-block text-danger">{props.error}</span>
                    </div>
                    <div>
                        <input className="btn-lg" type="text" name="grantAccessNewArgName" onChange={props.onChange} value={props.grantAccessNewArgName} placeholder="arg name" />
                    </div>
                    <div>
                        <button type="submit" id="grant-access-submit" className="btn btn-success" onClick={props.onSubmitNewAccess} >Grant access</button>
                    </div>
                </div>
            )
        }
    }
}

export default AddAccess