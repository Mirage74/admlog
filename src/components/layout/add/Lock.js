import React from 'react'
const Lock = (props) => (
    <div>
        <small>
            Lock user
      </small>
        <div style={{ marginBottom: 25 }} className="input-group">
            <br />
            <select className="form-control" id="fieldAlockUser" onChange={props.onChange} name="lockUser" value={props.lockUser}>
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
export default Lock


