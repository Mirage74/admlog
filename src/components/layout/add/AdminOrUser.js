import React from 'react'
function AdminOrUser(props) {
    //console.log(props)
    if (props.isSupervisor) {
        return (
            <div>
                <small>
                    Admin user
                </small>
                <div style={{ marginBottom: 25 }} className="input-group">
                    <br />
                    <select className="form-control" id="fieldAdminOrUser" onChange={props.onChange} name="addAmin" value={props.addAmin}>
                        <option>
                            false
                        </option>
                        <option>
                            true
                        </option>
                    </select>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}
export default AdminOrUser



