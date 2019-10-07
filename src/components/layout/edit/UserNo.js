import React from 'react'
const UserNo = (props) => (
    <div style={{ marginBottom: 25 }} className="input-group">
        <input id="UserNo" type="text" disabled className="form-control" name="userNo" placeholder={props.userNo} />
    </div>
)
export default UserNo


