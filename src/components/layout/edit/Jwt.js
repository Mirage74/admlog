import React from 'react'
function showJWT(props) {
    //console.log("jwt props : ", props)
    return (
        <div>
            <small>
                JWT
            </small>
            <div style={{ marginBottom: 25 }} className="input-group">
                <input id="userJWT" type="text" readOnly className="form-control" value={props.jwt} />
            </div>
        </div>
    )
}
export default showJWT


